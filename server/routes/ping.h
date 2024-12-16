#pragma once

#include "crow.h"
#include "../src/cors.h"


void setupPingRoute(crow::App<CORSHandler>& app);
