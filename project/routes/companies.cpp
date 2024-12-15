#include "companies.h"

#include "../src/http_client.h"

#include "httplib.h"
#include "nlohmann/json.hpp"


void setupCompaniesRoute(crow::SimpleApp &app) {
    CROW_ROUTE(app, "/api/companies")(
        [](){
            MoexHttpClient client;

            const auto client_res = client.get_moex_companies();
            auto response = crow::response(client_res.status);
            std::string body;

            if (response.code != 200) {
                crow::json::wvalue err_answ;
                err_answ["error"] = "Failed to fetch companies data";
                response.body = err_answ.dump();
                return response;
            }

            std::unordered_map<std::string, std::string> companiesMapping;
            const nlohmann::json responseJson = nlohmann::json::parse(client_res.body);

            for (const auto& company_info: responseJson["securities"]["data"]) {
                companiesMapping[company_info[0]] = company_info[2];
            }

            const nlohmann::json companiesMappingJson = companiesMapping;
            response.body = companiesMappingJson.dump();
            return response;
        }
    );
}