#pragma once

#include "crow.h"
#include "../src/cors.h"


void setupCompaniesRoute(crow::App<CORSHandler>& app);
