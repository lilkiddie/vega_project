#include <optional>

#include "httplib.h"

#define MOEX_DOMAIN "http://iss.moex.com"
#define COMPANIES_INFO_PATH "/iss/engines/stock/markets/shares/boards/TQBR/securities.json"

using namespace httplib;


class MoexHttpCleint : Client{
public:
    MoexHttpCleint() : Client(MOEX_DOMAIN) {};

    std::optional<std::string> get_moex_companies () {
        try {
            auto res = Get(COMPANIES_INFO_PATH);

            if (!res || res->status != 200) {
                std::cerr << "Request failed with status: " << (res ? res->status : 0) << std::endl;
                return std::nullopt;
            }
            return res->body;
        } catch (const std::exception& e) {
            std::cerr << "Exception in get_moex_companies: " << e.what() << std::endl;
            return std::nullopt;
        };
    };
};
