#include "crow.h"

#include "routes/routes.h"
#include "src/cors.h"

int main() {
    crow::App<CORSHandler> app;

    setupRoutes(app);

    app.port(18080).multithreaded().run();
}
