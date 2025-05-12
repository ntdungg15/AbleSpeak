export type IllustrationType = "dictionary" | "vocabulary";
export type IllustrationCategory = "animals" | "food" | "travel" | "nature" | "sports";

export interface IllustrationItem {
    id: string;
    word: string;
    definition: string;
    pronunciation: string;
    image: { uri: string };
    category: IllustrationCategory;
    type: IllustrationType;
    options?: string[];
    correctAnswer?: number;
}

export const fetchIllustrations = (): Promise<IllustrationItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(illustrationData);
        }, 300);
    });
};


export const illustrationData: IllustrationItem[] = [
    {
        id: "animal1",
        word: "Lion",
        definition:
            "A large wild cat with a mane around its face, living in Africa.",
        pronunciation: "/ˈlaɪən/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896761/lion_hnocf8.jpg",
        },
        category: "animals",
        type: "dictionary",
    },
    {
        id: "animal2",
        word: "Elephant",
        definition:
            "A very large animal with a long, flexible nose and two tusks.",
        pronunciation: "/ˈelɪfənt/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896762/elephant_xytl1e.jpg",
        },
        category: "animals",
        type: "dictionary",
    },


    {
        id: "voc-animal1",
        word: "Lion",
        definition:
            "A large wild cat with a mane around its face, living in Africa.",
        pronunciation: "/ˈlaɪən/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896761/lion_hnocf8.jpg",
        },
        category: "animals",
        type: "vocabulary",
        options: ["Tiger", "Lion", "Leopard", "Cheetah"],
        correctAnswer: 1,
    },
    {
        id: "voc-animal2",
        word: "Elephant",
        definition:
            "A very large animal with a long, flexible nose and two tusks.",
        pronunciation: "/ˈelɪfənt/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896823/Sushi_ayqydt.jpg",
        },
        category: "animals",
        type: "vocabulary",
        options: ["Rhinoceros", "Hippopotamus", "Elephant", "Giraffe"],
        correctAnswer: 2,
    },
    {
        "id": "animal3",
        "word": "Tiger",
        "definition": "A large wild cat with a pattern of dark vertical stripes on reddish-orange fur.",
        "pronunciation": "/ˈtaɪɡər/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/tiger_w61ylz.jpg"
        },
        "category": "animals",
        "type": "dictionary"
    },
    {
        "id": "voc-animal3",
        "word": "Tiger",
        "definition": "A large wild cat with a pattern of dark vertical stripes on reddish-orange fur.",
        "pronunciation": "/ˈtaɪɡər/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/tiger_w61ylz.jpg"
        },
        "category": "animals",
        "type": "vocabulary",
        "options": ["Lion", "Tiger", "Leopard", "Cheetah"],
        "correctAnswer": 1
    },
    {
        "id": "animal4",
        "word": "Giraffe",
        "definition": "A very tall African mammal with a long neck and legs, and distinctive spotted coat.",
        "pronunciation": "/dʒəˈræf/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960672/habitat_giraffe_bpny9x.jpg"
        },
        "category": "animals",
        "type": "dictionary"
    },
    {
        "id": "voc-animal4",
        "word": "Giraffe",
        "definition": "A very tall African mammal with a long neck and legs, and distinctive spotted coat.",
        "pronunciation": "/dʒəˈræf/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960672/habitat_giraffe_bpny9x.jpg"
        },
        "category": "animals",
        "type": "vocabulary",
        "options": ["Elephant", "Hippopotamus", "Giraffe", "Zebra"],
        "correctAnswer": 2
    },
    {
        "id": "animal5",
        "word": "Zebra",
        "definition": "An African wild horse with black-and-white stripes and an erect mane.",
        "pronunciation": "/ˈziːbrə/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960555/zebra_ga1jt8.jpg"
        },
        "category": "animals",
        "type": "dictionary"
    },
    {
        "id": "voc-animal5",
        "word": "Zebra",
        "definition": "An African wild horse with black-and-white stripes and an erect mane.",
        "pronunciation": "/ˈziːbrə/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960555/zebra_ga1jt8.jpg"
        },
        "category": "animals",
        "type": "vocabulary",
        "options": ["Zebra", "Giraffe", "Horse", "Donkey"],
        "correctAnswer": 0
    },
    {
        "id": "animal6",
        "word": "Monkey",
        "definition": "A mammal of the primate order, typically with a long tail and agile movements.",
        "pronunciation": "/ˈmʌŋki/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960130/monkey_cm0lne.jpg"
        },
        "category": "animals",
        "type": "dictionary"
    },
    {
        "id": "voc-animal6",
        "word": "Monkey",
        "definition": "A mammal of the primate order, typically with a long tail and agile movements.",
        "pronunciation": "/ˈmʌŋki/",
        "image": {
            "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960130/monkey_cm0lne.jpg"
        },
        "category": "animals",
        "type": "vocabulary",
        "options": ["Monkey", "Baboon", "Gorilla", "Chimpanzee"],
        "correctAnswer": 0
    },

    {
        id: "food1",
        word: "Pizza",
        definition:
            "A flat, round bread covered with tomato sauce, cheese, and other toppings.",
        pronunciation: "/ˈpiːtsə/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896823/Pizza_q7neo1.jpg",
        },
        category: "food",
        type: "dictionary",
    },
    {
        id: "food2",
        word: "Sushi",
        definition:
            "A Japanese dish of prepared rice with fish, vegetables, or eggs.",
        pronunciation: "/ˈsuːʃi/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896823/Sushi_ayqydt.jpg",
        },
        category: "food",
        type: "dictionary",
    },


    {
        id: "voc-food1",
        word: "Pizza",
        definition:
            "A flat, round bread covered with tomato sauce, cheese, and other toppings.",
        pronunciation: "/ˈpiːtsə/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896823/Pizza_q7neo1.jpg",
        },
        category: "food",
        type: "vocabulary",
        options: ["Pasta", "Pizza", "Burger", "Sandwich"],
        correctAnswer: 1,
    },
    {
        id: "voc-food2",
        word: "Sushi",
        definition:
            "A Japanese dish of prepared rice with fish, vegetables, or eggs.",
        pronunciation: "/ˈsuːʃi/",
        image: {
            uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746896823/Sushi_ayqydt.jpg",
        },
        category: "food",
        type: "vocabulary",
        options: ["Sushi", "Ramen", "Tempura", "Sashimi"],
        correctAnswer: 0,
    },
    {
        "id": "food3",
        "word": "Burger",
        "definition": "A sandwich consisting of a cooked patty of ground meat placed inside a split bread roll.",
        "pronunciation": "/ˈbɜːrɡər/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960130/burger_jy8stw.jpg"
        },
        "category": "food",
        "type": "dictionary"
    },
    {
        "id": "food4",
        "word": "Sandwich",
        "definition": "Two slices of bread with one or more fillings between them, eaten as a light meal.",
        "pronunciation": "/ˈsænwɪdʒ/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/sandwich_a1efen.jpg"
        },
        "category": "food",
        "type": "dictionary"
    },
    {
        "id": "food5",
        "word": "Pasta",
        "definition": "An Italian food typically made from an unleavened dough of wheat flour mixed with water or eggs, formed into various shapes.",
        "pronunciation": "/ˈpæstə/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963268/pasta_zyo7rx.jpg"
        },
        "category": "food",
        "type": "dictionary"
    },
    {
        "id": "food6",
        "word": "Ice Cream",
        "definition": "A soft frozen food made with sweetened and flavored milk fat, often eaten as a dessert.",
        "pronunciation": "/ˈaɪs ˌkriːm/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/cream_h9zaob.jpg"
        },
        "category": "food",
        "type": "dictionary"
    },
    {
        "id": "voc-food3",
        "word": "Burger",
        "definition": "A sandwich consisting of a cooked patty of ground meat placed inside a split bread roll.",
        "pronunciation": "/ˈbɜːrɡər/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960130/burger_jy8stw.jpg"
        },
        "category": "food",
        "type": "vocabulary",
        "options": ["Pizza", "Burger", "Hot Dog", "Fries"],
        "correctAnswer": 1
    },
    {
        "id": "voc-food4",
        "word": "Sandwich",
        "definition": "Two slices of bread with one or more fillings between them, eaten as a light meal.",
        "pronunciation": "/ˈsænwɪdʒ/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/sandwich_a1efen.jpg"
        },
        "category": "food",
        "type": "vocabulary",
        "options": ["Salad", "Sandwich", "Wrap", "Toast"],
        "correctAnswer": 1
    },
    {
        "id": "voc-food5",
        "word": "Pasta",
        "definition": "An Italian food typically made from an unleavened dough of wheat flour mixed with water or eggs, formed into various shapes.",
        "pronunciation": "/ˈpæstə/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963268/pasta_zyo7rx.jpg"
        },
        "category": "food",
        "type": "vocabulary",
        "options": ["Rice", "Bread", "Pasta", "Noodles"],
        "correctAnswer": 2
    },
    {
        "id": "voc-food6",
        "word": "Ice Cream",
        "definition": "A soft frozen food made with sweetened and flavored milk fat, often eaten as a dessert.",
        "pronunciation": "/ˈaɪs ˌkriːm/",
        "image": {
          "uri": "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746960131/cream_h9zaob.jpg"
        },
        "category": "food",
        "type": "vocabulary",
        "options": ["Yogurt", "Ice Cream", "Popsicle", "Sherbet"],
        "correctAnswer": 1
    },
      
    // TRAVEL - DICTIONARY
    {
        id: "travel1",
        word: "Airplane",
        definition: "A vehicle that flies in the sky and carries people or goods.",
        pronunciation: "/ˈerpleɪn/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963597/Airplane_emhlwq.jpg" },
        category: "travel",
        type: "dictionary",
    },
    {
        id: "travel2",
        word: "Train",
        definition: "A series of connected vehicles that run on tracks and transport people or goods.",
        pronunciation: "/treɪn/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963596/Train_bx6xfy.jpg" },
        category: "travel",
        type: "dictionary",
    },
    {
        id: "travel3",
        word: "Bus",
        definition: "A large vehicle that carries passengers by road.",
        pronunciation: "/bʌs/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963599/b%C3%BA_ee4pgm.jpg" },
        category: "travel",
        type: "dictionary",
    },
    {
        id: "travel4",
        word: "Bicycle",
        definition: "A vehicle with two wheels that you ride by pushing pedals.",
        pronunciation: "/ˈbaɪsɪkl/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963597/Bicycle_fs8hrl.jpg" },
        category: "travel",
        type: "dictionary",
    },
    {
        id: "travel5",
        word: "Taxi",
        definition: "A car with a driver that you pay to take you somewhere.",
        pronunciation: "/ˈtæksi/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963598/Taxi_xelywr.jpg" },
        category: "travel",
        type: "dictionary",
    },
    {
        id: "travel6",
        word: "Ship",
        definition: "A large boat that carries people or goods by sea.",
        pronunciation: "/ʃɪp/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963598/Ship_gtlagm.jpg" },
        category: "travel",
        type: "dictionary",
    },

    // TRAVEL - VOCABULARY
    {
        id: "voc-travel1",
        word: "Airplane",
        definition: "A vehicle that flies in the sky and carries people or goods.",
        pronunciation: "/ˈerpleɪn/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963597/Airplane_emhlwq.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Airplane", "Helicopter", "Train", "Bus"],
        correctAnswer: 0,
    },
    {
        id: "voc-travel2",
        word: "Train",
        definition: "A series of connected vehicles that run on tracks and transport people or goods.",
        pronunciation: "/treɪn/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963596/Train_bx6xfy.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Bus", "Train", "Car", "Bicycle"],
        correctAnswer: 1,
    },
    {
        id: "voc-travel3",
        word: "Bus",
        definition: "A large vehicle that carries passengers by road.",
        pronunciation: "/bʌs/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963599/b%C3%BA_ee4pgm.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Bus", "Car", "Truck", "Taxi"],
        correctAnswer: 0,
    },
    {
        id: "voc-travel4",
        word: "Bicycle",
        definition: "A vehicle with two wheels that you ride by pushing pedals.",
        pronunciation: "/ˈbaɪsɪkl/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963597/Bicycle_fs8hrl.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Bicycle", "Motorcycle", "Scooter", "Car"],
        correctAnswer: 0,
    },
    {
        id: "voc-travel5",
        word: "Taxi",
        definition: "A car with a driver that you pay to take you somewhere.",
        pronunciation: "/ˈtæksi/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963598/Taxi_xelywr.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Taxi", "Bus", "Car", "Train"],
        correctAnswer: 0,
    },
    {
        id: "voc-travel6",
        word: "Ship",
        definition: "A large boat that carries people or goods by sea.",
        pronunciation: "/ʃɪp/",
        image: { uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746963598/Ship_gtlagm.jpg" },
        category: "travel",
        type: "vocabulary",
        options: ["Boat", "Ship", "Submarine", "Yacht"],
        correctAnswer: 1,
    },

    // NATURE - DICTIONARY
    {
        id: "nature1",
        word: "Tree",
        definition: "A tall plant with a trunk and branches made of wood.",
        pronunciation: "/triː/",
        image: { uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" },
        category: "nature",
        type: "dictionary",
    },
    {
        id: "nature2",
        word: "Mountain",
        definition: "A very high hill, often with steep sides.",
        pronunciation: "/ˈmaʊntən/",
        image: { uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
        category: "nature",
        type: "dictionary",
    },
    {
        id: "nature3",
        word: "River",
        definition: "A large, flowing body of water.",
        pronunciation: "/ˈrɪvər/",
        image: { uri: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99" },
        category: "nature",
        type: "dictionary",
    },
    {
        id: "nature4",
        word: "Flower",
        definition: "The colorful part of a plant that makes seeds.",
        pronunciation: "/ˈflaʊər/",
        image: { uri: "https://images.unsplash.com/photo-1464983953574-0892a716854b" },
        category: "nature",
        type: "dictionary",
    },
    {
        id: "nature5",
        word: "Lake",
        definition: "A large area of water surrounded by land.",
        pronunciation: "/leɪk/",
        image: { uri: "https://images.unsplash.com/photo-1509228468518-180dd4864904" },
        category: "nature",
        type: "dictionary",
    },
    {
        id: "nature6",
        word: "Forest",
        definition: "A large area covered chiefly with trees and undergrowth.",
        pronunciation: "/ˈfɔːrɪst/",
        image: { uri: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0" },
        category: "nature",
        type: "dictionary",
    },

    // NATURE - VOCABULARY
    {
        id: "voc-nature1",
        word: "Tree",
        definition: "A tall plant with a trunk and branches made of wood.",
        pronunciation: "/triː/",
        image: { uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" },
        category: "nature",
        type: "vocabulary",
        options: ["Tree", "Flower", "Bush", "Grass"],
        correctAnswer: 0,
    },
    {
        id: "voc-nature2",
        word: "Mountain",
        definition: "A very high hill, often with steep sides.",
        pronunciation: "/ˈmaʊntən/",
        image: { uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
        category: "nature",
        type: "vocabulary",
        options: ["Hill", "Mountain", "Valley", "Cliff"],
        correctAnswer: 1,
    },
    {
        id: "voc-nature3",
        word: "River",
        definition: "A large, flowing body of water.",
        pronunciation: "/ˈrɪvər/",
        image: { uri: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99" },
        category: "nature",
        type: "vocabulary",
        options: ["Lake", "River", "Sea", "Pond"],
        correctAnswer: 1,
    },
    {
        id: "voc-nature4",
        word: "Flower",
        definition: "The colorful part of a plant that makes seeds.",
        pronunciation: "/ˈflaʊər/",
        image: { uri: "https://images.unsplash.com/photo-1464983953574-0892a716854b" },
        category: "nature",
        type: "vocabulary",
        options: ["Flower", "Leaf", "Tree", "Fruit"],
        correctAnswer: 0,
    },
    {
        id: "voc-nature5",
        word: "Lake",
        definition: "A large area of water surrounded by land.",
        pronunciation: "/leɪk/",
        image: { uri: "https://images.unsplash.com/photo-1509228468518-180dd4864904" },
        category: "nature",
        type: "vocabulary",
        options: ["Lake", "River", "Sea", "Pond"],
        correctAnswer: 0,
    },
    {
        id: "voc-nature6",
        word: "Forest",
        definition: "A large area covered chiefly with trees and undergrowth.",
        pronunciation: "/ˈfɔːrɪst/",
        image: { uri: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0" },
        category: "nature",
        type: "vocabulary",
        options: ["Forest", "Desert", "Jungle", "Field"],
        correctAnswer: 0,
    },

    // SPORTS - DICTIONARY
    {
        id: "sports1",
        word: "Soccer",
        definition: "A game played by two teams of eleven players with a round ball.",
        pronunciation: "/ˈsɑːkər/",
        image: { uri: "https://images.unsplash.com/photo-1509228468518-180dd4864904" },
        category: "sports",
        type: "dictionary",
    },
    {
        id: "sports2",
        word: "Basketball",
        definition: "A game played by two teams of five players who try to score by throwing a ball through a hoop.",
        pronunciation: "/ˈbæskɪtbɔːl/",
        image: { uri: "https://images.unsplash.com/photo-1464983953574-0892a716854b" },
        category: "sports",
        type: "dictionary",
    },
    {
        id: "sports3",
        word: "Tennis",
        definition: "A game played with rackets by two or four players who hit a ball over a net.",
        pronunciation: "/ˈtenɪs/",
        image: { uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" },
        category: "sports",
        type: "dictionary",
    },
    {
        id: "sports4",
        word: "Swimming",
        definition: "The sport or activity of moving through water by moving your arms and legs.",
        pronunciation: "/ˈswɪmɪŋ/",
        image: { uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
        category: "sports",
        type: "dictionary",
    },
    {
        id: "sports5",
        word: "Baseball",
        definition: "A game played with a bat and ball between two teams of nine players.",
        pronunciation: "/ˈbeɪsbɔːl/",
        image: { uri: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99" },
        category: "sports",
        type: "dictionary",
    },
    {
        id: "sports6",
        word: "Cycling",
        definition: "The sport or activity of riding a bicycle.",
        pronunciation: "/ˈsaɪklɪŋ/",
        image: { uri: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0" },
        category: "sports",
        type: "dictionary",
    },

    // SPORTS - VOCABULARY
    {
        id: "voc-sports1",
        word: "Soccer",
        definition: "A game played by two teams of eleven players with a round ball.",
        pronunciation: "/ˈsɑːkər/",
        image: { uri: "https://images.unsplash.com/photo-1509228468518-180dd4864904" },
        category: "sports",
        type: "vocabulary",
        options: ["Soccer", "Basketball", "Tennis", "Baseball"],
        correctAnswer: 0,
    },
    {
        id: "voc-sports2",
        word: "Basketball",
        definition: "A game played by two teams of five players who try to score by throwing a ball through a hoop.",
        pronunciation: "/ˈbæskɪtbɔːl/",
        image: { uri: "https://images.unsplash.com/photo-1464983953574-0892a716854b" },
        category: "sports",
        type: "vocabulary",
        options: ["Basketball", "Soccer", "Tennis", "Baseball"],
        correctAnswer: 0,
    },
    {
        id: "voc-sports3",
        word: "Tennis",
        definition: "A game played with rackets by two or four players who hit a ball over a net.",
        pronunciation: "/ˈtenɪs/",
        image: { uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" },
        category: "sports",
        type: "vocabulary",
        options: ["Tennis", "Soccer", "Basketball", "Swimming"],
        correctAnswer: 0,
    },
    {
        id: "voc-sports4",
        word: "Swimming",
        definition: "The sport or activity of moving through water by moving your arms and legs.",
        pronunciation: "/ˈswɪmɪŋ/",
        image: { uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
        category: "sports",
        type: "vocabulary",
        options: ["Swimming", "Cycling", "Running", "Baseball"],
        correctAnswer: 0,
    },
    {
        id: "voc-sports5",
        word: "Baseball",
        definition: "A game played with a bat and ball between two teams of nine players.",
        pronunciation: "/ˈbeɪsbɔːl/",
        image: { uri: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99" },
        category: "sports",
        type: "vocabulary",
        options: ["Baseball", "Soccer", "Basketball", "Tennis"],
        correctAnswer: 0,
    },
    {
        id: "voc-sports6",
        word: "Cycling",
        definition: "The sport or activity of riding a bicycle.",
        pronunciation: "/ˈsaɪklɪŋ/",
        image: { uri: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0" },
        category: "sports",
        type: "vocabulary",
        options: ["Cycling", "Swimming", "Running", "Soccer"],
        correctAnswer: 0,
    },
];