FROM gcc:latest

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
    ca-certificates \
    git \
    build-essential \
    cmake \
    curl \
    zip \
    pkg-config && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/microsoft/vcpkg /vcpkg && \
    /vcpkg/bootstrap-vcpkg.sh

RUN /vcpkg/vcpkg install crow cpp-httplib nlohmann-json fmt

RUN apt-get update -y && \
    apt-get install --no-install-recommends -y libboost-all-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY ./ ./app

WORKDIR ./app

RUN mkdir build && cd build && cmake .. && make

CMD ["./build/app"]

EXPOSE 18080
