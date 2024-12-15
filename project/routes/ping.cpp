#include "ping.h"

void setupPingRoute(crow::SimpleApp &app) {
    CROW_ROUTE(app, "/")(
        [](){
            crow::json::wvalue answ;
            answ["message"] = "Hello world!";
            return answ;
        }
    );

}