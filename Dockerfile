FROM node:alpine as builder
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client .
# There's an error right here
# Wait for response
RUN npm run build

FROM golang:alpine
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
ENV GIN_MODE=release
COPY --from=builder /app/build ./
RUN go build -o /go-reacts
EXPOSE 8080
CMD [ "/go-react" ]