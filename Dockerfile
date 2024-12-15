FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install --reinstall ca-certificates -y

RUN apt-get install -y git build-essential cmake --no-install-recommends

RUN git clone https://github.com/microsoft/vcpkg
RUN apt-get install -y curl zip
RUN vcpkg/bootstrap-vcpkg.sh

RUN apt-get install pkg-config -y

RUN /vcpkg/vcpkg install crow
RUN /vcpkg/vcpkg install cpp-httplib
RUN /vcpkg/vcpkg install nlohmann-json
RUN /vcpkg/vcpkg install fmt

COPY ./project ./project

WORKDIR /build

RUN bash -c "cmake ../project && make"

CMD ["bash"]
