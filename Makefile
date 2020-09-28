image := gurps:latest
dockerfile := Dockerfile

default: build
.PHONY: build
build: $(dockerfile)
	docker build -t $(image) .

.PHONY: test
test: $(build)
	    docker run --rm $(image) gurps --help

.PHONY: clean
clean:
	docker image rm $(image)
