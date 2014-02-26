
var levels = [
    {
        name: "Social Network",
        model: socialModel,
        questions: [
            {
                question: "How many friends does Alice have?",
                answers: ["3", "three"],
                correct: "3"
            },
            {
                question: "How many friends does Eve have?",
                answers: ["1", "one"],
                correct: "1"
            },
            {
                question: "Which friend do Alice and Eve have in common?",
                answers: ["charlie"],
                correct: "Charlie"
            }
        ]
    },
    {
        name: "Product Catalog",
        model: productCatalogModel,
        questions: [
            {
                question: "What category does the Phillips Screwdriver belong to?",
                answers: ["screwdrivers", "screw drivers", "tools", "all"],
                correct: "Screwdrivers"
            },
            {
                question: "What is the top-level category called?",
                answers: ["all"],
                correct: "All"
            },
            {
                question: "How many products does the top-level category include, including all subcategories?",
                answers: ["4", "four"],
                correct: "4"
            },
            {
                question: "What is the average price of all power tools?",
                answers: ["1500", "$1500", "$1,500", "1,500", "fifteen hundred", "fifteen hundred dollars"],
                correct: "$1,500"
            }
        ]
    },
    {
        name: "Network Dependency Graph",
        model: networkManagementModel,
        questions: [
            {
                question: "What does the CRM system immediately depend on?",
                answers: ["database vm", "database", "database virtual machine"],
                correct: "Database VM"
            },
            {
                question: "What downstream system do both servers 1 and 2 depend on?",
                answers: ["san", "storage", "storage area network", "storage network", "san system"],
                correct: "SAN"
            },
            {
                question: "If server 1 fails, what service is affected?",
                answers: ["public website", "website", "web site"],
                correct: "Public Website"
            }
        ]
    },
    {
        name: "Fraud Detection",
        model: fraudDetectionModel,
        questions: [
            {
                question: "How many credit cards have transacted with merchant TomJones?",
                answers: ["2", "two"],
                correct: "2"
            },
            {
                question: "Is there a deep connection between merchants TomJones and Jane?",
                answers: ["yes", "yeah", "y", "true"],
                correct: "Yes"
            },
            {
                question: "Is there a deep connection between merchants TomJones and Shrinivas?",
                answers: ["no", "nope", "n", "false"],
                correct: "No"
            }
        ]
    },
    {
        name: "Access Control",
        model: accessControlModel,
        questions: [
            {
                question: "Who in the finance department living in New York has access to the Fortune 500 Q2 Forecast?",
                answers: ["hank", "hank does"],
                correct: "Hank"
            }
        ]
    }
]
