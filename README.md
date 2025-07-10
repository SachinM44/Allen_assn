# Product Price Comparison - Flipkart vs Amazon

An end-to-end test automation project using Playwright with TypeScript to compare iPhone 15 Plus prices between Flipkart and Amazon.

## Objective

This project implements an automated test that:
- Navigates to both Flipkart and Amazon websites
- Validates URLs and page loads
- Searches for "iPhone 15 Plus" on both platforms
- Extracts and compares product prices
- Executes tests in parallel for efficiency
- Provides detailed test reports and traces

## Tech Stack

- **Playwright** - End-to-end testing framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

## Requirements Implemented

- Playwright with TypeScript setup
- Navigate to Flipkart and Amazon
- URL and title validation
- Product search functionality
- Search results validation
- Price extraction from both sites
- Price comparison logic
- Parallel execution using Promise.all()
- Multiple assertions for robust testing
- Console price logging
- Detailed error messages
- Trace generation for debugging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Allen
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Running Tests

### Basic Test Execution
```bash
npm test
```

### Run with Browser UI (Headed Mode)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run show-report
```

```

## Configuration

### Playwright Config Features:
- **Timeout**: 60 seconds for complex operations
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Traces**: Generated for debugging
- **Parallel Execution**: Enabled for faster test runs

### Test Features:
- **Parallel Search**: Both sites searched simultaneously
- **Robust Selectors**: Handles dynamic content
- **Price Validation**: Ensures valid numeric prices
- **Product Matching**: Verifies correct iPhone 15 Plus results

## Test Logic

The test follows this workflow:

1. **Setup**: Creates separate browser contexts for each site
2. **Navigation**: Navigates to Flipkart and Amazon in parallel
3. **Search**: Searches for "iPhone 15 Plus" on both platforms
4. **Validation**: Verifies product names contain required keywords
5. **Price Extraction**: Extracts numerical price values
6. **Comparison**: Compares prices and determines result
7. **Reporting**: Logs results and generates detailed reports

### Success Criteria:
- **PASS**: If Flipkart price < Amazon price
- **FAIL**: If Flipkart price >= Amazon price (with detailed message)

## Debugging

### View Traces:
When tests fail, traces are automatically generated. Open them with:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Screenshots:
Failed test screenshots are saved in `test-results/` directory.

### Console Output:
The test logs detailed information including:
- Product names found on each site
- Extracted prices
- Comparison results

## Sample Output

```
Flipkart Product: { name: 'Apple iPhone 15 Plus...', price: 89900, site: 'Flipkart' }
Amazon Product: { name: 'Apple iPhone 15 Plus...', price: 91900, site: 'Amazon' }
Flipkart Price: ₹89900
Amazon Price: ₹91900
Test PASSED: Flipkart has a lower price
```

## Error Handling

The test includes comprehensive error handling:
- Network timeout handling
- Element visibility checks
- Price parsing validation
- Detailed error messages with actual vs expected values
