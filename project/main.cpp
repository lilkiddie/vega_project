#include "crow.h"

#include "routes/routes.h"

int main() {
    crow::SimpleApp app;

    setupRoutes(app);
    
    app.port(18080).multithreaded().run();
}
