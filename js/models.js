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



