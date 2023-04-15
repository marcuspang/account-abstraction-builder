FROM rust:1.67 as builder
WORKDIR /usr/src/backend
COPY . .
RUN apt-get update && apt-get install -y cmake libprotobuf-dev protobuf-compiler && rm -rf /var/lib/apt/lists/*
RUN cargo install --git https://github.com/foundry-rs/foundry foundry-cli forge anvil chisel --bins --locked
RUN cargo install --path .

FROM debian:bullseye-slim
COPY --from=builder /usr/local/cargo/bin/backend /usr/local/bin/backend
COPY --from=builder /usr/local/cargo/bin/forge /usr/local/bin/forge
EXPOSE 1510
CMD ["backend"]
