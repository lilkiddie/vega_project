#include "httplib.h"
#include "nlohmann/json.hpp"

#include <chrono>

#include "shares.hpp"
#include "../src/http_client.h"
#include "../utils/utils.hpp"

void setupSharesRoute(crow::SimpleApp& app) {
    CROW_ROUTE(app, "/api/companies/shares").methods(crow::HTTPMethod::Post)(
        [](const crow::request& req){
            MoexHttpClient client;

            auto from = req.url_params.get("from");
            auto to = req.url_params.get("to");

            std::string to_ = get_date();
            std::string from_ = get_date(7);

            if (from) {
                from_ = from;
            }

            if (to) {
                to_ = to;
            }

            const nlohmann::json request_json = nlohmann::json::parse(req.body);

            // {day -> {share -> price}}
            std::unordered_map<std::string, std::unordered_map<std::string, double>> bag;

            // {company -> shares_count}
            std::unordered_map<std::string, int> shares;

            for (const auto& item : request_json) {
                std::map<std::string, std::string> params;

                std::string company_name = item.at("key").get<std::string>();
                size_t shares_count = item.at("count").get<int>();

                if (shares.count(company_name) == 0) {
                    shares[company_name] = 0;
                }
                shares[company_name] += shares_count;
            }

            for (const auto& [company_name, cnt] : shares) {
                const auto client_res = client.get_moex_company_shares(company_name, from_, to_);

                auto response = crow::response(client_res.status);
                std::string body;

                if (response.code != 200) {
                    crow::json::wvalue err_answ;
                    err_answ["error"] = "Failed to fetch company shares";
                    response.body = err_answ.dump();
                    return response;
                }

                const nlohmann::json response_json = nlohmann::json::parse(client_res.body);
                auto data = response_json["candles"]["data"];
                for (const auto& item : data) {
                    std::string begin = (std::string) item[6];
                    std::string date = begin.substr(0, begin.find(" "));
                    double price = (double) item[1];
                    bag[date][company_name] = price * cnt;
                }
            }
            
            crow::json::wvalue response;
            
            for (const auto& [date, shares] : bag) {
                auto sum = std::accumulate(
                    std::begin(shares),
                    std::end(shares),
                    0.,
                    [](const double previous, const std::pair<std::string, double>& p)
                    { return previous + p.second; }
                );
                std::ostringstream ss;
                ss << std::fixed << std::setprecision(2) << sum;
                response[date] = ss.str();
            }

            return crow::response{response};
        }
    );
}
