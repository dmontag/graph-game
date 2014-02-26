
var socialModel = {
    style: "graph",
    labels: [
        "Person"
    ],
    nodes: [
        {name: "Alice", label: "Person", _visible: true}, 
        {name: "Bob", label: "Person"},
        {name: "Charlie", label: "Person"},
        {name: "Dianne", label: "Person"},
        {name: "Eve", label: "Person", _visible: true}
    ], 
    links: [
        {source:0, target:1},
        {source:0, target:2},
        {source:0, target:3},
        {source:2, target:4}
    ]
};

var productCatalogModel = {
    style: "tree",
    labels: [
        "Category",
        "Product"
    ],
    nodes: [
        {name: "Cat - All", label: "Category"}, 
        {name: "Cat - Tools", label: "Category"}, 
        {name: "Cat - Power Tools", label: "Category"}, 
        {name: "Cat - Screwdrivers", label: "Category"},
        {name: "Power saw [$1,000]", label: "Product"},
        {name: "Drill [$2,000]", label: "Product"},
        {name: "Phillips Screwdriver [$20]", label: "Product", _visible: true},
        {name: "Cat - Storage", label: "Category"}, 
        {name: "50gal Plastic Bin [$40]", label: "Product"}
    ], 
    links: [
        {source:0, target:1},
        {source:1, target:2},
        {source:1, target:3},
        {source:2, target:4},
        {source:2, target:5},
        {source:3, target:6},
        {source:0, target:7},
        {source:7, target:8}
    ]
};

var networkManagementModel = {
    style: "tree",
    labels: [
        "Service",
        "Virtual Machine",
        "Server",
        "Storage"
    ],
    nodes: [
        {name: "SAN", label: "Storage"},
        {name: "Server 2", label: "Server"},
        {name: "Server 1", label: "Server"},
        {name: "Database VM", label: "Virtual Machine"},
        {name: "Webserver VM", label: "Virtual Machine"},
        {name: "CRM System", label: "Service", _visible: true},
        {name: "Public Website", label: "Service"}
    ],
    links: [
        {source:6, target:4},
        {source:6, target:3},
        {source:5, target:3},
        {source:4, target:2},
        {source:3, target:1},
        {source:2, target:0},
        {source:1, target:0}
    ]
};

var fraudDetectionModel = {
    style: "graph", 
    labels: [
        "Merchant Account",
        "Transacted Credit Card",
        "Bank Account", 
        "Social Security Number"
    ],
    nodes: [
        {name: "TomJones", label: "Merchant Account", _visible: true}, // 0
        {name: "Visa 4225", label: "Transacted Credit Card"},
        {name: "AMEX 53264", label: "Transacted Credit Card"},
        {name: "Sophie252", label: "Merchant Account"},
        {name: "Abby424", label: "Merchant Account"},
        {name: "BofA Account #4634", label: "Bank Account"},

        {name: "Jane", label: "Merchant Account", _visible: true}, // 6
        {name: "Cayman Account #42", label: "Bank Account"},
        {name: "Jimmy", label: "Merchant Account"},
        {name: "152-35-6745", label: "Social Security Number"},
        {name: "Robert", label: "Merchant Account"},

        {name: "Shrinivas", label: "Merchant Account", _visible: true}, // 11
        {name: "MasterCard 2352", label: "Transacted Credit Card"},
        {name: "Visa 1633", label: "Transacted Credit Card"},
        {name: "HSBC Account #735", label: "Bank Account"}


    ],
    links: [
        {source: 1, target: 0},
        {source: 2, target: 0},
        {source: 1, target: 3},
        {source: 1, target: 4},
        {source: 0, target: 5},
        {source: 3, target: 5},
        {source: 4, target: 5},

        {source: 6, target: 7},
        {source: 8, target: 7},
        {source: 8, target: 9},
        {source: 10, target: 9},
        {source: 10, target: 5},

        {source: 12, target: 11},
        {source: 13, target: 11},
        {source: 11, target: 14}
    ]
};

var accessControlModel = {
    style: "graph",
    labels: [
        "Employee",
        "Department",
        "Location",
        "Asset Group",
        "Resource"
    ],
    nodes: [
        {name: "Hank", label: "Employee"},
        {name: "Michelle", label: "Employee"},
        {name: "Jenny", label: "Employee"},

        {name: "Finance Dept.", label: "Department", _visible: true},
        {name: "IT Dept.", label: "Department"},

        {name: "New York Branch", label: "Location", _visible: true},
        {name: "Los Angeles Branch", label: "Location"},

        {name: "Sensitive Assets", label: "Asset Group"},
        {name: "Public Assets", label: "Asset Group"},

        {name: "Fortune 500 Q2 Forecast", label: "Resource", _visible: true},
        {name: "January Press Release", label: "Resource"}
    ],
    links: [
        {source: 0, target: 3},
        {source: 1, target: 3},
        {source: 2, target: 4},

        {source: 0, target: 5},
        {source: 1, target: 6},
        {source: 2, target: 5},

        {source: 0, target: 7},
        {source: 1, target: 8},
        {source: 2, target: 7},
        {source: 2, target: 8},

        {source: 9, target: 7},
        {source: 10, target: 8}
    ]
};

var origFraudDetectionModel = {
    style: "graph", 
    labels: [
        "Merchant",
        "Bank Account",
        "Social Security Number"
    ],
    nodes: [
        {name: "Cayman Account #863"},
        {name: "SSN #993-63-2634"},
        {name: "Max", _visible: true},
        {name: "Sophie"},
        {name: "Abby"},
        {name: "Hank"},
        {name: "BofA Account #4634"},
        {name: "SSN #523-25-2364"},
        {name: "Bill"},
        {name: "Chase Account #1523"},
        {name: "SSN #123-45-6789"},
        {name: "Jane"}
    ],
    links: [
        {source: 11, target: 9},
        {source: 11, target: 10},
        {source: 8, target: 6},
        {source: 8, target: 7},
        {source: 4, target: 1},
        {source: 3, target: 1},
        {source: 2, target: 1},
        {source: 5, target: 0},
        {source: 4, target: 0}
    ]
};

