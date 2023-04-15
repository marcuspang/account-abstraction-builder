FROM rust:1.67 as builder
WORKDIR /usr/src/backend
COPY . .
RUN cargo install --path .

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y protobuf-compiler && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/backend /usr/local/bin/backend
RUN cargo install --git https://github.com/foundry-rs/foundry foundry-cli forge anvil chisel --bins --locked
EXPOSE 1510
CMD ["backend"]
