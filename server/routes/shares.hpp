#pragma once

#include "crow.h"
#include "../src/cors.h"

void setupSharesRoute(crow::App<CORSHandler>&);
