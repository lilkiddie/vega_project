#include "companies.h"

#include "../src/http_client.h"

#include "httplib.h"
#include "nlohmann/json.hpp"


void setupCompaniesRoute(crow::SimpleApp &app) {
    CROW_ROUTE(app, "/api/companies")(
        [](){
            MoexHttpCleint client;
            const auto res = client.get_moex_companies();
            if (!res) {
                crow::json::wvalue err_answ;
                err_answ["error"] = "Failed to fetch companies data";
                return err_answ;
            }

            std::unordered_map<std::string, std::string> companiesMapping;
            const nlohmann::json responseJson = nlohmann::json::parse(*res);

            for (const auto& company_info: responseJson["securities"]["data"]) {
                companiesMapping[company_info[0]] = company_info[2];
            }

            const nlohmann::json companiesMappingJson = companiesMapping;
            return (crow::json::wvalue) companiesMappingJson.dump();
        }
    );
}