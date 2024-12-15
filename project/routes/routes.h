#pragma once

#include "crow.h"

#include "ping.h"
#include "companies.h"
#include "shares.hpp"


void setupRoutes(crow::SimpleApp& app) {

    setupPingRoute(app);
    setupCompaniesRoute(app);
    setupSharesRoute(app);
    
}