import { Book } from "../../../src/book/interfaces/book.interface";

export const booksMockup: Book[] = [
  {
    isbn10: "201210133X",
    isbn13: "9782012101333",
    title: "Astérix le Gaulois",
    authors: [],
    description:
      "Dans le camp fortifié romain Petibonum, on se pose des questions : comment les Irréductibles Gaulois du village d’Astérix font-ils pour ridiculiser encore et toujours la puissance romaine ? Décidé à percer à jour le mystère de la force surhumaine de nos héros, le centurion Caius Bonus envoie un espion déguisé en Gaulois.",
    coverImageUrl:
      "https://www.asterix.com/wp-content/uploads/2017/06/alb01fr.png",
    categories: ["Humor"],
    releaseAt: new Date("12-20-1967"),
    comments: [
      {
        message: "Excellent!",
      },
    ],
    meta: {
      favorites: ["test"],
      likes: ["azerty"],
    },
    hidden: false,
  },
  {
    isbn10: "2014001537",
    isbn13: "9782014001532",
    title: "Les 12 Travaux d'Astérix",
    authors: [],
    description:
      "DLes 12 Travaux d'Astérix, enfin dans votre collection ! Célébrez le 40e anniversaire du long métrage animé, et découvrez le nouvel album illustré tiré du film culte d'Astérix et ses amis. Sur le modèle de l'album Comment Obélix est tombé dans la marmite quand il était petit, profitez des magnifiques illustrations signées Albert Uderzo, encrées à la plume et colorées à l'aquarelle, et savourez le texte et les dialogues inoubliables écrits par René Goscinny. Un nouvel album illustré de 80 pages pour ajouter enfin à votre collection l'aventure mythique des irréductibles gaulois !",
    coverImageUrl:
      "https://vignette.wikia.nocookie.net/asterix/images/c/cb/TwelveTasksofAsterixPoster.jpg",
    categories: ["Humor"],
    releaseAt: new Date("10-20-1976"),
    comments: [
      {
        message: "Magique!",
      },
    ],
    meta: {
      favorites: ["azerty"],
      likes: ["test", "azerty"],
    },
    hidden: false,
  },
  {
    isbn10: "1781101035",
    isbn13: "9781781101032",
    title: "Harry Potter à L'école des Sorciers",
    authors: [],
    description:
      "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée. Un géant vient le chercher pour l’emmener à Poudlard, une école de sorcellerie! Voler en balai, jeter des sorts, combattre les trolls : Harry Potter se révèle un sorcier doué. Mais un mystère entoure sa naissance et l’effroyable V..., le mage dont personne n’ose prononcer le nom. Amitié, surprises, dangers, scènes comiques, Harry découvre ses pouvoirs et la vie à Poudlard. Le premier tome des aventures du jeune héros vous ensorcelle aussitôt!",
    coverImageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/517MH9KJ38L._SX327_BO1,204,203,200_.jpg",
    categories: ["Juvenile Fiction"],
    releaseAt: new Date("12-05-2001"),
    comments: [
      {
        message: "Magique! Un livre vraiment magnifique j'adoré!",
      },
    ],
    meta: {
      favorites: ["test", "azerty"],
      likes: ["test"],
    },
    hidden: false,
  },
  {
    isbn10: "1781101078",
    isbn13: "9781781101070",
    title: "Harry Potter et l’Ordre du Phénix",
    authors: [],
    description:
      "À quinze ans, Harry entre en cinquième année à Poudlard, mais il n’a jamais été si anxieux. L’adolescence, la perspective des examens et ces étranges cauchemars... Car Celui-Dont-On-Ne-Doit-Pas-Prononcer- Le-Nom est de retour. Le ministère de la Magie semble ne pas prendre cette menace au sérieux, contrairement à Dumbledore. La résistance s’organise alors autour de Harry qui va devoir compter sur le courage et la fidélité de ses amis de toujours... D’une inventivité et d’une virtuosité rares, découvrez le cinquième tome de cette saga que son auteur a su hisser au rang de véritable phénomène littéraire.",
    coverImageUrl:
      "https://static.fnac-static.com/multimedia/Images/FR/NR/b0/91/7c/8163760/1540-1/tsp20171002094918/Harry-Potter-et-l-ordre-du-Phenix.jpg",
    categories: ["Juvenile Fiction"],
    releaseAt: new Date("06-21-2003"),
    comments: [
      {
        message: "Excellent!",
      },
      {
        message: "Magique! Un livre vraiment magnifique j'adoré!",
      },
    ],
    meta: {
      favorites: ["test", "azerty"],
      likes: ["test", "azerty"],
    },
    hidden: false,
  },
  {
    isbn10: "1781101043",
    isbn13: "9781781101049",
    title: "Harry Potter et la Chambre des Secrets",
    authors: [],
    description:
      "Une rentrée fracassante en voiture volante, une étrange malédiction qui s’abat sur les élèves, cette deuxième année à l’école des sorciers ne s’annonce pas de tout repos! Entre les cours de potions magiques, les matches de Quidditch et les combats de mauvais sorts, Harry et ses amis Ron et Hermione trouveront-ils le temps de percer le mystère de la Chambre des Secrets? Le deuxiè me volume des aventures de Harry Potter : un livre magique pour sorciers confirmés.",
    coverImageUrl:
      "https://images-eu.ssl-images-amazon.com/images/I/51jx819qI1L.jpg",
    categories: ["Juvenile Fiction"],
    releaseAt: new Date("12-04-2002"),
    comments: [
      {
        message: "Excellent!",
      },
    ],
    meta: {
      favorites: ["test", "azerty"],
      likes: ["test", "azerty"],
    },
    hidden: false,
  },
];
