#include "ping.h"

void setupPingRoute(crow::App<CORSHandler>& app) {
    CROW_ROUTE(app, "/")(
        [](const crow::request&, crow::response& res){
            res.write("Hello world!");
            res.end();
        }
    );
}
