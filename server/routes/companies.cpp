#include "companies.h"

#include "../src/http_client.h"

#include "httplib.h"
#include "nlohmann/json.hpp"


void setupCompaniesRoute(crow::App<CORSHandler> &app) {
    CROW_ROUTE(app, "/api/companies")(
        [](const crow::request&, crow::response& res){
            MoexHttpClient client;

            const auto client_res = client.get_moex_companies();
            res.code = client_res.status;
            std::string body;

            if (res.code != 200) {
                crow::json::wvalue err_answ;
                err_answ["error"] = "Failed to fetch companies data";
                res.write(err_answ.dump());
                res.end();
                return;
            }

            std::unordered_map<std::string, std::string> companiesMapping;
            const nlohmann::json responseJson = nlohmann::json::parse(client_res.body);

            for (const auto& company_info: responseJson["securities"]["data"]) {
                companiesMapping[company_info[0]] = company_info[2];
            }

            const nlohmann::json companiesMappingJson = companiesMapping;
            res.write(companiesMappingJson.dump());
            res.end();
        }
    );
}