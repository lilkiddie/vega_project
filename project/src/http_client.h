#include <optional>

#include "httplib.h"
#include <vector>
#include <fmt/core.h>
#include <boost/algorithm/string/join.hpp>

#define MOEX_DOMAIN "http://iss.moex.com"
#define COMPANIES_INFO_PATH "/iss/engines/stock/markets/shares/boards/TQBR/securities.json"
#define COMPANY_INFO_PATH "/iss/engines/stock/markets/shares/securities/{}/candles.json"

using namespace httplib;


class MoexHttpClient : Client{
public:
    MoexHttpClient() : Client(MOEX_DOMAIN) {};

    httplib::Response get_moex_companies () {
        try {
            return make_request(COMPANIES_INFO_PATH, {});
        } catch (const std::exception& e) {
            std::cerr << "Exception in get_moex_companies: " << e.what() << std::endl;
            auto res = httplib::Response();
            res.status =httplib::InternalServerError_500;
            res.body = "";
            return res;
        };
    };

    httplib::Response get_moex_company_shares (std::string company, std::string from, std::string to) {
        try {
            return make_request(fmt::format(COMPANY_INFO_PATH, company), get_moex_company_shares_params(from, to));
        } catch (const std::exception& e) {
            std::cerr << "Exception in get_moex_company_shares: " << e.what() << std::endl;
            auto res = httplib::Response();
            res.status =httplib::InternalServerError_500;
            res.body = "";
            return res;
        };
    };

private:
    std::string build_params (const std::unordered_map<std::string, std::string>& params) const {
        std::vector<std::string> params_built;
        for (const auto [key, value] : params) {
            params_built.push_back(key + "=" + value);
        }
        return boost::algorithm::join(params_built, "&");
    };

    std::string make_url (const std::string& path, const std::unordered_map<std::string, std::string>& params) {
        std::string built_params = build_params(params);
        return (path + "?" + built_params).c_str();
    }

    httplib::Response handle_response (httplib::Result res) {
        auto built_res = httplib::Response();
        if (!res) {
            built_res.body = "";
            built_res.status = httplib::InternalServerError_500;
            return built_res;
        }
        built_res.body = res->body;
        built_res.status = res->status;
        return built_res;
    };

    httplib::Response make_request (const std::string& path, const std::unordered_map<std::string, std::string>& params) {
        std::string url = make_url(path, params);
        return handle_response(Get(url));
    };

    std::unordered_map<std::string, std::string> get_moex_company_shares_params(std::string from, std::string to) {
        std::unordered_map<std::string, std::string> params;
        params["from"] = from;
        params["till"] = to;
        params["interval"] = "24";
        return params;
    }
};
