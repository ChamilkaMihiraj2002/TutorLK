# Makefile for React + TypeScript frontend

# Variables
PACKAGE_MANAGER = npm
SRC_DIR = .

# Install dependencies
install:
	@echo "Installing dependencies..."
	$(PACKAGE_MANAGER) install

# Start development server
start:
	@echo "Starting development server..."
	$(PACKAGE_MANAGER) run dev   # For Vite
	# $(PACKAGE_MANAGER) start   # Uncomment if using CRA

# Build production files
build:
	@echo "Building production files..."
	$(PACKAGE_MANAGER) run build

# Run tests
test:
	@echo "Running tests..."
	$(PACKAGE_MANAGER) test

# Lint code
lint:
	@echo "Linting the code..."
	$(PACKAGE_MANAGER) run lint

# Clean node_modules and build folder
clean:
	@echo "Cleaning node_modules and build folder..."
	rm -rf node_modules
	rm -rf dist      # Vite build folder
	rm -rf build     # CRA build folder
