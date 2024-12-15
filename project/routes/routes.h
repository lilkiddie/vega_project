#pragma once

#include "crow.h"

#include "ping.h"
#include "companies.h"


void setupRoutes(crow::SimpleApp& app) {

    setupPingRoute(app);
    setupCompaniesRoute(app);
    
}