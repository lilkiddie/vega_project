#pragma once

#include "crow.h"

#include "ping.h"
#include "companies.h"
#include "shares.hpp"
#include "../src/cors.h"


void setupRoutes(crow::App<CORSHandler>& app) {

    setupPingRoute(app);
    setupCompaniesRoute(app);
    setupSharesRoute(app);
}