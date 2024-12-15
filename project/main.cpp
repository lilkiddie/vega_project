#include "crow.h"

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")(
        [](){
            crow::json::wvalue x;
            x["message"] = "Hello world!";
            return x;
        }
    );
    
    app.port(18080).multithreaded().run();
}
