# Makefile for React frontend project

# Variables
PACKAGE_MANAGER = npm
SRC_DIR = .

# Commands
install:
	@echo "Installing dependencies..."
	$(PACKAGE_MANAGER) install

dev:
	@echo "Starting development server..."
	$(PACKAGE_MANAGER) start

build:
	@echo "Building production files..."
	$(PACKAGE_MANAGER) run build

lint:
	@echo "Linting the code..."
	$(PACKAGE_MANAGER) run lint

test:
	@echo "Running tests..."
	$(PACKAGE_MANAGER) test

clean:
	@echo "Cleaning node_modules and build folder..."
	rm -rf node_modules
	rm -rf build
