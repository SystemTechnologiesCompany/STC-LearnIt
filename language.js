(() => {
  const storageKey = 'stc-learnit-language';
  const translations = {
    'STUDENT ACCOUNT': 'COMPTE ÉTUDIANT',
    'Sign in to manage your profile.': 'Connectez-vous pour gérer votre profil.',
    'Your profile, Learnit ID, followers and classmates are connected to your student account.': 'Votre profil, votre identifiant Learnit, vos abonnés et vos camarades sont liés à votre compte étudiant.',
    'Log in to continue ': 'Connectez-vous pour continuer ',
    'Try again': 'Réessayer',
    'Your student profile is not ready yet.': 'Votre profil étudiant n’est pas encore prêt.',
    'The profile database needs its setup SQL. Run the latest supabase/setup.sql in the Supabase SQL Editor, then try again.': 'La base de données du profil nécessite son script d’installation. Exécutez le fichier supabase/setup.sql dans l’éditeur SQL de Supabase, puis réessayez.',
    'We could not load your profile. Check your connection and try again.': 'Impossible de charger votre profil. Vérifiez votre connexion et réessayez.',
    'Student accounts are unavailable.': 'Les comptes étudiants sont indisponibles.',
    'The Supabase client could not load. Open this page from the hosted website and check the Supabase configuration.': 'Le client Supabase n’a pas pu être chargé. Ouvrez cette page depuis le site hébergé et vérifiez la configuration Supabase.',
    'We could not check your sign-in. Refresh the page and try again.': 'Impossible de vérifier votre connexion. Actualisez la page et réessayez.',
    'Choose your faculty in Edit your profile to see suggested classmates.': 'Choisissez votre faculté dans Modifier votre profil pour voir des camarades suggérés.',
    'Search results': 'Résultats de recherche',
    'No student found with this Learnit ID. Check the ID and try again.': 'Aucun étudiant trouvé avec cet identifiant Learnit. Vérifiez-le et réessayez.',
    'No classmates from your faculty have joined yet.': 'Aucun camarade de votre faculté n’a encore rejoint la plateforme.',
    'Could not load classmates. Try again in a moment.': 'Impossible de charger les camarades. Réessayez dans un instant.',
    'Could not update your follows. Please try again.': 'Impossible de mettre à jour vos abonnements. Réessayez.',
    'Could not save your profile. Please try again.': 'Impossible d’enregistrer votre profil. Réessayez.',
    'Checking your account…': 'Vérification du compte…', 'Saved on this device': 'Enregistré sur cet appareil',
    'Syncing progress…': 'Synchronisation de la progression…', 'Progress synced to your account': 'Progression synchronisée avec votre compte',
    'Sync unavailable. Progress is saved on this device.': 'Synchronisation indisponible. Progression enregistrée sur cet appareil.',
    'Username': 'Nom d’utilisateur', 'Choose a unique username': 'Choisissez un nom d’utilisateur unique',
    'Your username is unique. Use 3–30 letters, numbers, dots or underscores.': 'Votre nom d’utilisateur est unique. Utilisez 3 à 30 lettres, chiffres, points ou tirets bas.',
    'Could not upload your photo. Check the avatar storage setup and try again.': 'Impossible d’envoyer votre photo. Vérifiez la configuration du stockage des avatars et réessayez.',
    'Log out': 'Se déconnecter',
    'Following': 'Abonné·e',
    '＋ Follow': '＋ Suivre',
    'Built for curious minds across Algeria': 'Pour les esprits curieux d’Algérie',
    'Kasdi Merbah University': 'Université Kasdi Merbah', 'Follow us on LinkedIn': 'Suivez-nous sur LinkedIn',
    'Your university, your community': 'Votre université, votre communauté',
    'How it works': 'Comment ça marche', 'Explore faculties': 'Explorer les facultés',
    'Explore subjects': 'Explorer les matières', 'The learning path': 'Parcours d’apprentissage',
    'Learn & practice': 'Apprendre et pratiquer',
    'YOUR LEARNING JOURNEY': 'VOTRE PARCOURS D’APPRENTISSAGE',
    'Learn a little.': 'Apprenez un peu.', 'Grow a lot.': 'Progressez beaucoup.',
    'Follow a clear path, practice what you learn, and build confidence one small win at a time.': 'Suivez un parcours clair, mettez vos acquis en pratique et prenez confiance grâce à chaque progrès.',
    'DAILY GOAL': 'OBJECTIF DU JOUR', ' day streak': ' jours de série', ' XP earned': ' XP gagnés',
    'A little practice goes a long way.': 'Un peu de pratique mène loin.',
    'Daily goal complete — great work!': 'Objectif du jour atteint — bravo !',
    'YOUR STUDY PATHS': 'VOS PARCOURS D’ÉTUDE', 'Choose a subject': 'Choisissez une matière',
    'FIRST PATH · READY': 'PREMIER PARCOURS · DISPONIBLE',
    'LEARNING PATH IN PROGRESS': 'PARCOURS EN PRÉPARATION',
    'LESSON 01': 'LEÇON 01', 'LESSON 02': 'LEÇON 02', 'LESSON 03': 'LEÇON 03',
    'UNIT CHECKPOINT': 'ÉVALUATION DE L’UNITÉ', 'FINAL EXAM': 'EXAMEN FINAL',
    'COMPLETED': 'TERMINÉ', 'START HERE': 'COMMENCER ICI', 'LOCKED': 'VERROUILLÉ', 'DONE': 'TERMINÉ', 'UNIT 1': 'UNITÉ 1',
    'Inside planet Earth': 'À l’intérieur de la Terre', 'Discover the layers beneath your feet.': 'Découvrez les couches sous vos pieds.',
    'Rocks & minerals': 'Roches et minéraux', 'Learn what rocks are made of.': 'Découvrez la composition des roches.',
    'A moving planet': 'Une planète en mouvement', 'See how tectonic plates shape Earth.': 'Découvrez comment les plaques tectoniques façonnent la Terre.',
    'Earth basics checkpoint': 'Évaluation des bases de la Terre', 'Bring the first three lessons together.': 'Réunissez les acquis des trois premières leçons.',
    'Earth science level exam': 'Examen du niveau en sciences de la Terre', 'Pass the exam to complete this level.': 'Réussissez l’examen pour terminer ce niveau.',
    'YOUR FIRST LEARNING PATH': 'VOTRE PREMIER PARCOURS', 'Earth & Universe Sciences · Licence Year 1': 'Sciences de la Terre et de l’Univers · Licence 1re année',
    'YOUR PROGRESS': 'VOTRE PROGRESSION', 'STEPS': 'ÉTAPES', 'Level complete!': 'Niveau terminé !',
    'Practice this subject with AI ': 'Étudier cette matière avec l’IA ',
    'Your subject selection will be carried into the study assistant.': 'La matière choisie sera transmise à l’assistant d’étude.',
    'Start practice ': 'Commencer l’entraînement ', 'Continue learning ': 'Continuer à apprendre ',
    'Open learning path ': 'Ouvrir le parcours ', 'Study with AI': 'Étudier avec l’IA',
    'Next question': 'Question suivante', 'Finish practice': 'Terminer l’entraînement', 'Choose an answer': 'Choisissez une réponse',
    'Back': 'Retour', 'Try again': 'Réessayer', 'Brilliant work!': 'Excellent travail !',
    'Review complete—no extra XP this time.': 'Révision terminée — pas de XP supplémentaire cette fois.',
    'You earned ': 'Vous avez gagné ', ' XP.': ' XP.', 'Keep your momentum going.': 'Continuez sur votre lancée.',
    'One more round?': 'Encore un essai ?', 'right. You need ': ' bonnes réponses. Il vous en faut ', ' correct to pass.': ' pour réussir.',
    'That’s right!': 'Bonne réponse !', 'Not quite.': 'Pas tout à fait.',
    '5 min': '5 min', '6 min': '6 min', '7 min': '7 min', '3 questions': '3 questions', '5 questions': '5 questions',
    'Earth basics': 'Les bases de la Terre',
    'Earth is built in layers. The thin, solid crust is broken into tectonic plates. Beneath it, the mantle is hot rock that moves very slowly. The liquid outer core surrounds a solid inner core.': 'La Terre est composée de plusieurs couches. La croûte, mince et solide, est divisée en plaques tectoniques. En dessous, le manteau est constitué de roches chaudes qui se déplacent très lentement. Le noyau externe liquide entoure un noyau interne solide.',
    'A mineral is a naturally occurring solid with a consistent chemical composition and crystal structure. A rock is a natural material made of one or more minerals. Geologists use properties such as hardness, streak and lustre to identify minerals.': 'Un minéral est un solide naturel dont la composition chimique et la structure cristalline sont constantes. Une roche est un matériau naturel formé d’un ou plusieurs minéraux. Les géologues utilisent des propriétés comme la dureté, la trace et l’éclat pour identifier les minéraux.',
    'Earth’s outer shell is divided into large plates that move slowly over the softer mantle. Plates can move apart, collide or slide past each other. Their boundaries help explain earthquakes, volcanoes and mountain building.': 'L’enveloppe externe de la Terre est divisée en grandes plaques qui se déplacent lentement sur le manteau plus souple. Les plaques peuvent s’écarter, entrer en collision ou coulisser. Leurs limites aident à expliquer les séismes, les volcans et la formation des montagnes.',
    'Quick review! You need at least 2 correct answers to pass this checkpoint. Take your time and use what you have learned.': 'Révision rapide ! Il faut au moins 2 bonnes réponses pour réussir cette évaluation. Prenez votre temps et mobilisez vos acquis.',
    'Your first level finale! Get at least 4 out of 5 correct to pass. You can retry if you need another round.': 'La finale de votre premier niveau ! Il faut au moins 4 bonnes réponses sur 5 pour réussir. Vous pouvez réessayer si nécessaire.',
    'Which layer is the thin, solid outer surface of Earth?': 'Quelle couche forme la surface externe, mince et solide de la Terre ?',
    'Which layer surrounds the solid inner core?': 'Quelle couche entoure le noyau interne solide ?',
    'What is the key difference between a mineral and a rock?': 'Quelle est la différence principale entre un minéral et une roche ?',
    'What is one result of plates sliding past each other?': 'Quel phénomène peut résulter du glissement de deux plaques l’une contre l’autre ?',
    'What can happen when two tectonic plates collide?': 'Que peut-il se passer lorsque deux plaques tectoniques entrent en collision ?',
    'Which part of Earth is liquid?': 'Quelle partie de la Terre est liquide ?', 'A rock is usually…': 'Une roche est généralement…', 'Plates move slowly over the…': 'Les plaques se déplacent lentement sur…',
    'Which layer forms Earth’s thin, solid surface?': 'Quelle couche forme la surface mince et solide de la Terre ?',
    'What is a mineral?': 'Qu’est-ce qu’un minéral ?', 'What surrounds the inner core?': 'Qu’est-ce qui entoure le noyau interne ?',
    'What can happen where tectonic plates meet?': 'Que peut-il se passer à la rencontre des plaques tectoniques ?', 'A rock is made of…': 'Une roche est composée…',
    'The crust': 'La croûte', 'The outer core': 'Le noyau externe', 'The mantle': 'Le manteau', 'The liquid outer core': 'Le noyau externe liquide',
    'A mineral has a consistent composition and crystal structure': 'Un minéral a une composition et une structure cristalline constantes',
    'A rock is always one pure substance': 'Une roche est toujours une substance pure', 'Minerals are made only by people': 'Les minéraux sont uniquement fabriqués par l’être humain',
    'Its streak': 'Sa trace', 'Its country of origin': 'Son pays d’origine', 'Its age in years': 'Son âge en années',
    'They may build mountains': 'Elles peuvent former des montagnes', 'Earth stops rotating': 'La Terre cesse de tourner', 'The mantle disappears': 'Le manteau disparaît',
    'Earthquakes': 'Des séismes', 'A new inner core': 'Un nouveau noyau interne', 'The oceans vanish': 'Les océans disparaissent',
    'A mixture of minerals': 'Un assemblage de minéraux', 'A single tectonic plate': 'Une seule plaque tectonique', 'A type of earthquake': 'Un type de séisme',
    'Outer core': 'Noyau externe', 'Mantle': 'Manteau', 'Atmosphere': 'Atmosphère', 'Only liquid metal': 'Uniquement du métal liquide', 'A single layer of Earth': 'Une seule couche terrestre',
    'The crust is Earth’s thin, solid outer layer. It forms the surface we live on.': 'La croûte est la couche externe, mince et solide de la Terre. Elle forme la surface sur laquelle nous vivons.',
    'Earth’s liquid outer core surrounds the solid inner core.': 'Le noyau externe liquide de la Terre entoure le noyau interne solide.',
    'Minerals have a defined composition and crystal structure; rocks are mixtures of one or more minerals.': 'Les minéraux ont une composition et une structure cristalline définies ; les roches sont des assemblages d’un ou plusieurs minéraux.',
    'Streak, hardness, lustre and cleavage are useful clues when identifying minerals.': 'La trace, la dureté, l’éclat et le clivage aident à identifier les minéraux.',
    'When plates converge, the crust can crumple into mountain ranges, or one plate can move beneath another.': 'Lorsque les plaques convergent, la croûte peut se plisser et former des montagnes, ou une plaque peut passer sous l’autre.',
    'Friction and sudden movement along plate boundaries can produce earthquakes.': 'Les frottements et les mouvements soudains aux limites des plaques peuvent provoquer des séismes.',
    'The outer core is liquid; the inner core is solid.': 'Le noyau externe est liquide ; le noyau interne est solide.',
    'Rocks are natural materials made of one or more minerals.': 'Les roches sont des matériaux naturels constitués d’un ou plusieurs minéraux.',
    'Tectonic plates move over the softer, slowly moving mantle.': 'Les plaques tectoniques se déplacent sur le manteau, plus souple et animé de mouvements lents.',
    'The crust is Earth’s thin, solid surface.': 'La croûte est la surface mince et solide de la Terre.',
    'The liquid outer core surrounds the solid inner core.': 'Le noyau externe liquide entoure le noyau interne solide.',
    'Plate boundaries are associated with earthquakes, volcanoes and mountain building.': 'Les limites des plaques sont associées aux séismes, aux volcans et à la formation des montagnes.',
    'Learning path': 'Parcours d’apprentissage', 'My profile': 'Mon profil', 'Leaderboard': 'Classement',
    'Log in': 'Se connecter', 'Get started ': 'Commencer ', 'Start learning ': 'Commencer à apprendre ',
    'See how it works ': 'Découvrir le fonctionnement ', 'Made by the STC team for students in Algeria': 'Créé par l’équipe STC pour les étudiants en Algérie',
    'YOUR STUDY ROUTINE, REIMAGINED': 'VOTRE ROUTINE D’ÉTUDE, REPENSÉE',
    'Little lessons.': 'De petites leçons.', 'Big “I got this” energy.': 'La confiance de tout réussir.',
    'A learning path designed around the way students actually study.': 'Un parcours conçu pour la façon dont les étudiants apprennent vraiment.',
    'FIND YOUR STARTING POINT': 'TROUVEZ VOTRE POINT DE DÉPART',
    'Big ambitions.': 'De grandes ambitions.', 'One place to begin.': 'Un seul endroit pour commencer.',
    'Explore faculties and study areas from across Kasdi Merbah University. Get AI help with any subject, then build your skills with learning paths, quizzes and games as they are added.': 'Explorez les facultés et domaines d’études de l’Université Kasdi Merbah. Obtenez une aide IA dans toutes les matières, puis progressez grâce aux parcours, quiz et jeux au fur et à mesure de leur ajout.',
    'Explore your study path': 'Explorez votre parcours', 'Search faculties and institutes': 'Rechercher des facultés et instituts',
    'YOUR PROGRESS, MADE VISIBLE': 'VOTRE PROGRESSION, EN UN COUP D’ŒIL',
    'Every lesson': 'Chaque leçon', 'gets you ': 'vous rapproche ', 'closer.': 'du but.',
    'Follow a clear path through your subject. Complete lessons and games, pass unit exams, then take a final exam to earn your next level.': 'Suivez un parcours clair dans votre matière. Terminez les leçons et les jeux, réussissez les examens d’unité, puis passez l’examen final pour atteindre le niveau suivant.',
    'See your learning path ': 'Voir mon parcours ', 'YOUR NEXT CHAPTER STARTS HERE': 'VOTRE PROCHAINE ÉTAPE COMMENCE ICI',
    'Ready to make': 'Prêt à progresser', 'progress your thing?': 'chaque jour ?',
    'Pick your study path and take your first small step today.': 'Choisissez votre parcours et faites aujourd’hui votre premier pas.',
    'Find my study path ': 'Trouver mon parcours ', 'STC The Way To Greatness': 'STC, la voie vers l’excellence',
    'Inspired by Kasdi Merbah University ': 'Inspiré par l’Université Kasdi Merbah ',
    'Data based on Kasdi Merbah University of Ouargla': 'Données basées sur l’Université Kasdi Merbah de Ouargla',
    'View university website ': 'Visiter le site de l’université ',
    'YOUR NEXT LEVEL AWAITS': 'VOTRE PROCHAIN NIVEAU VOUS ATTEND', 'Join the journey.': 'Rejoignez le parcours.',
    'Save your study path, earn XP and keep your streak going.': 'Enregistrez votre parcours, gagnez des XP et entretenez votre série.',
    ' Continue with Google ': ' Continuer avec Google ', 'or use your Gmail': 'ou utilisez votre Gmail',
    'Gmail address': 'Adresse Gmail', 'Continue with email ': 'Continuer par e-mail ',
    'GEOLOGY · LICENCE YEAR 1': 'GÉOLOGIE · LICENCE 1', 'Your first unit starts here.': 'Votre première unité commence ici.',
    'Follow the path to earn XP, learn key ideas and prepare for your unit exam.': 'Suivez le parcours pour gagner des XP, apprendre les notions clés et préparer votre examen d’unité.',
    'Inside planet Earth': 'À l’intérieur de la Terre', 'Layers, composition and structure · 6 min': 'Couches, composition et structure · 6 min',
    'START →': 'COMMENCER →', 'Rocks & minerals': 'Roches et minéraux', 'Identify the building blocks · 5 min': 'Identifier les constituants · 5 min',
    'QUIZ + GAME': 'QUIZ + JEU', 'Discover Earth’s moving surface · 7 min': 'Découvrir la surface mobile de la Terre · 7 min',
    '120 XP available ': '120 XP disponibles ',
    'STUDENT PROFILE': 'PROFIL ÉTUDIANT', 'YOUR STUDENT SPACE': 'VOTRE ESPACE ÉTUDIANT',
    'Your profile,': 'Votre profil,', 'your people.': 'vos proches.',
    'Make your space yours, share your Learnit ID, and find friends to keep each other moving forward.': 'Personnalisez votre espace, partagez votre identifiant Learnit et trouvez des amis pour avancer ensemble.',
    'MAKE IT YOURS': 'PERSONNALISEZ-LE', 'Edit your profile': 'Modifier mon profil', 'Your name': 'Votre nom',
    'This name appears on your student profile.': 'Ce nom apparaît sur votre profil étudiant.', 'Faculty or institute': 'Faculté ou institut',
    'Choose your faculty…': 'Choisissez votre faculté…', 'We’ll show it on your profile and suggest classmates from the same faculty.': 'Elle apparaîtra sur votre profil et nous suggérerons des étudiants de la même faculté.',
    'Your Learnit ID': 'Votre identifiant Learnit', 'Share this ID so classmates can find you.': 'Partagez cet identifiant pour que vos camarades vous trouvent.',
    'Save changes ': 'Enregistrer ', 'STUDY TOGETHER': 'ÉTUDIONS ENSEMBLE', 'Find your people.': 'Trouvez vos camarades.',
    'Search for a classmate using their Learnit ID and follow their study journey.': 'Recherchez un camarade avec son identifiant Learnit et suivez son parcours.',
    'Suggested classmates': 'Camarades suggérés', 'CHOOSE FACULTY': 'CHOISISSEZ UNE FACULTÉ',
    'SAME FACULTY': 'MÊME FACULTÉ', 'SEARCH RESULTS': 'RÉSULTATS DE RECHERCHE',
    'Copy ID': 'Copier l’identifiant', 'Followers': 'Abonnés', 'Following': 'Abonnements', 'Learning XP': 'XP d’apprentissage',
    'ONLINE': 'EN LIGNE', 'OFFLINE': 'HORS LIGNE', 'Faculty not selected': 'Aucune faculté sélectionnée',
    'YOUR UNIVERSITY, YOUR WAY': 'VOTRE UNIVERSITÉ, À VOTRE FAÇON',
    'Study smarter.': 'Étudiez mieux.', 'Level up.': 'Passez au niveau supérieur.',
    'University subjects made easier to learn, one little win at a time. Pick your speciality, play your way through lessons, and climb to your next level.': 'Les matières universitaires deviennent plus faciles, une petite victoire après l’autre. Choisissez votre spécialité, apprenez en jouant et atteignez le niveau suivant.',
    'What are you studying?': 'Qu’étudiez-vous ?', 'YOUR STUDY AREA': 'VOTRE DOMAINE D’ÉTUDE',
    'YOUR UNIVERSITY, YOUR WAY': 'VOTRE UNIVERSITÉ, À VOTRE FAÇON',
    'faculties & institutes': 'facultés et instituts', 'Search faculties or subjects…': 'Rechercher des facultés ou des matières…',
    'All': 'Tout', 'Faculties': 'Facultés', 'Institutes': 'Instituts', 'YOUR FIRST LEARNING PATH': 'VOTRE PREMIER PARCOURS',
    'Lessons, games and exams built for your level.': 'Des leçons, des jeux et des examens adaptés à votre niveau.',
    'Study level': 'Niveau d’études', 'Explore course ': 'Explorer le cours ',
    'YOUR STUDY PATH': 'VOTRE PARCOURS D’ÉTUDE', 'Choose a faculty': 'Choisissez une faculté',
    'Choose a study area and level to get started.': 'Choisissez un domaine et un niveau pour commencer.',
    'Choose a study area and level. The AI assistant can help with any subject.': 'Choisissez un domaine et un niveau. L’assistant IA peut vous aider dans toutes les matières.',
    'Department or subject': 'Département ou matière', 'Explore study path ': 'Explorer le parcours ',
    'Build your learning path.': 'Construisez votre parcours d’apprentissage.',
    'Your selected study area and level will guide your learning. Ask the STC assistant for explanations, examples, quizzes and revision help for any subject.': 'Votre domaine et votre niveau guideront votre apprentissage. Demandez à l’assistant STC des explications, des exemples, des quiz et de l’aide pour réviser toutes les matières.',
    'Lessons, quizzes, and games across university subjects.': 'Des leçons, quiz et jeux dans toutes les matières universitaires.',
    'Start building your ': 'Commencez votre parcours de ',
    'Personalized study path ': 'Parcours d’étude personnalisé ', 'Earn XP ': 'Gagner des XP ',
    'Study this subject with AI ': 'Étudier cette matière avec l’IA ',
    'Understand key concepts': 'Comprendre les notions clés',
    'Clear explanations and worked examples': 'Explications claires et exemples détaillés',
    'LEARN': 'APPRENDRE', 'Practice as you learn': 'S’entraîner en apprenant',
    'Quick quizzes and activities to build confidence': 'Quiz rapides et activités pour prendre confiance',
    'Prepare for exams': 'Préparer les examens', 'Review, test yourself and track your progress': 'Réviser, s’évaluer et suivre ses progrès',
    'YOUR STUDY ROUTINE, REIMAGINED': 'VOTRE ROUTINE D’ÉTUDE, REPENSÉE',
    'YOUR PROGRESS, MADE VISIBLE': 'VOTRE PROGRESSION, EN UN COUP D’ŒIL',
    '01 / LEARN': '01 / APPRENDRE', '02 / PLAY': '02 / JOUER', '03 / ADVANCE': '03 / PROGRESSER',
    'YOUR NEXT CHAPTER STARTS HERE': 'VOTRE PROCHAINE ÉTAPE COMMENCE ICI',
    'How levels work ': 'Comprendre les niveaux ', 'See the journey ': 'Voir le parcours ',
    'Geology': 'Géologie', 'YEAR 1': 'ANNÉE 1', 'Licence · Year 1': 'Licence · 1re année',
    'Licence · Year 2': 'Licence · 2e année', 'Licence · Year 3': 'Licence · 3e année',
    'Master · Year 1': 'Master · 1re année', 'Master · Year 2': 'Master · 2e année',
    'Please use a Gmail address to continue.': 'Veuillez utiliser une adresse Gmail pour continuer.',
    'Faculty of Medicine': 'Faculté de médecine',
    'Faculty of New Information Technologies & Communication': 'Faculté des nouvelles technologies de l’information et de la communication',
    'Faculty of Hydrocarbons, Renewable Energy, Earth & Universe Sciences': 'Faculté des hydrocarbures, des énergies renouvelables, des sciences de la Terre et de l’Univers',
    'Institute of Technology': 'Institut de technologie',
    'Faculty of Natural Sciences and Life': 'Faculté des sciences de la nature et de la vie',
    'Faculty of Applied Sciences': 'Faculté des sciences appliquées',
    'Faculty of Mathematics and Matter Sciences': 'Faculté des mathématiques et des sciences de la matière',
    'Faculty of Economics, Commercial Sciences and Management': 'Faculté des sciences économiques, commerciales et des sciences de gestion',
    'Faculty of Arts and Languages': 'Faculté des lettres et des langues',
    'Faculty of Law and Political Sciences': 'Faculté de droit et des sciences politiques',
    'Faculty of Humanities and Social Sciences': 'Faculté des sciences humaines et sociales',
    'Institute of Science and Techniques of Physical and Sporting Activities': 'Institut des sciences et techniques des activités physiques et sportives',
    'Medicine': 'Médecine', 'Computer and Information Technology': 'Informatique et technologies de l’information',
    'Electronics and Telecommunication': 'Électronique et télécommunications', 'Earth Science and Universe': 'Sciences de la Terre et de l’Univers',
    'Renewable Energy': 'Énergies renouvelables', 'Hydrocarbon Production': 'Production des hydrocarbures',
    'Drilling and Oil Mechanics': 'Forage et mécanique pétrolière', 'Technology': 'Technologie',
    'Biological Sciences': 'Sciences biologiques', 'Agricultural Sciences': 'Sciences agronomiques',
    'Process Engineering': 'Génie des procédés', 'Mechanical Engineering': 'Génie mécanique',
    'Civil and Hydraulic Engineering': 'Génie civil et hydraulique', 'Electrical Engineering': 'Génie électrique',
    'Mathematics': 'Mathématiques', 'Physics': 'Physique', 'Chemistry': 'Chimie',
    'Economics': 'Sciences économiques', 'Commercial Sciences': 'Sciences commerciales',
    'Management Sciences': 'Sciences de gestion', 'Arabic Language and Literature': 'Langue et littérature arabes',
    'French Language and Literature': 'Langue et littérature françaises', 'English Language and Literature': 'Langue et littérature anglaises',
    'Law': 'Droit', 'Political Sciences': 'Sciences politiques', 'Sociology and Demography': 'Sociologie et démographie',
    'Humanities': 'Sciences humaines', 'Information and Communication': 'Information et communication',
    'Psychology and Educational Sciences': 'Psychologie et sciences de l’éducation',
    'Physical and Sporting Activities': 'Activités physiques et sportives',
    'Faculty · ': 'Faculté · ', 'Institute · ': 'Institut · ', ' departments': ' départements', ' department': ' département',
    'Choose a study area and level. The AI assistant can help with any subject.': 'Choisissez un domaine et un niveau. L’assistant IA peut aider dans toutes les matières.',
    'Geology · Earth Science and Universe': 'Géologie · Sciences de la Terre et de l’Univers',
    'Please use a Gmail address to continue.': 'Veuillez utiliser une adresse Gmail pour continuer.',
    'Choose a study area first.': 'Choisissez d’abord un domaine d’étude.',
    'Choose a JPG, PNG or WebP image.': 'Choisissez une image JPG, PNG ou WebP.',
    'Choose an image smaller than 1.5 MB.': 'Choisissez une image de moins de 1,5 Mo.',
    'Your Learnit ID was copied.': 'Votre identifiant Learnit a été copié.',
    'Previous feature': 'Matière précédente', 'Next feature': 'Matière suivante', 'Choose a feature': 'Choisir une matière',
    'Search by Learnit ID': 'Rechercher avec un identifiant Learnit',
    'Choose your faculty…': 'Choisissez votre faculté…', 'Your name': 'Votre nom',
    'Student name': 'Nom de l’étudiant', 'Home': 'Accueil', '← Back to learning': '← Retour aux cours',
    'Find your study path ': 'Trouver votre parcours ', 'How it works': 'Comment ça marche',
    'Continue with email ': 'Continuer par e-mail ', 'Close study assistant': 'Fermer l’assistant d’étude',
    'Ask STC assistant': 'Demander à l’assistant STC', 'Need a study buddy?': 'Besoin d’un compagnon d’étude ?',
    'Search by Learnit ID': 'Rechercher par identifiant Learnit',
    'Your study journey is just getting started. Build good habits, celebrate small wins, and learn something new every day.': 'Votre parcours ne fait que commencer. Prenez de bonnes habitudes, célébrez chaque progrès et apprenez quelque chose de nouveau chaque jour.',
    'Search for a classmate using their Learnit ID and follow their study journey.': 'Recherchez un camarade avec son identifiant Learnit et suivez son parcours.',
    'OFFLINE': 'HORS LIGNE', 'Online': 'En ligne', 'Offline': 'Hors ligne',
    'Current': 'En cours', 'Unlocked': 'Débloqué', 'Locked': 'Verrouillé',
    'YOUR UNIVERSITY, YOUR WAY': 'VOTRE UNIVERSITÉ, À VOTRE FAÇON', 'YOUR STUDY AREA': 'VOTRE DOMAINE D’ÉTUDE',
    'faculties & institutes': 'facultés et instituts', 'Show your learning journey': 'Voir votre parcours d’apprentissage',
    'LEARN A LITTLE. GROW A LOT.': 'APPRENEZ UN PEU. PROGRESSEZ BEAUCOUP.',
    'Learn the basics': 'Apprendre les bases', 'Lessons + practice games': 'Leçons + jeux d’entraînement',
    'Pass the unit exam': 'Réussir l’examen d’unité', 'Show what you know': 'Montrez ce que vous savez',
    'Unlock the next unit': 'Débloquer l’unité suivante', 'Keep your learning streak': 'Gardez votre série d’apprentissage',
    'Take the final exam': 'Passer l’examen final', 'Complete your level': 'Terminez votre niveau',
    'YOUR JOURNEY': 'VOTRE PARCOURS', 'IN PROGRESS': 'EN COURS', 'LEVEL UP ↑': 'NIVEAU SUPÉRIEUR ↑',
    'Math example': 'Exemple de maths', 'Biology quiz': 'Quiz de biologie', 'Exam revision': 'Révision d’examen',
    'Ask a study question': 'Posez une question d’étude', 'Ask a study question…': 'Posez une question d’étude…',
    'STC STUDY ASSISTANT': 'ASSISTANT D’ÉTUDE STC', 'AI study assistant': 'Assistant d’étude IA',
    'STC AI STUDY BUDDY': 'ASSISTANT IA STC',
    'Need a study buddy?': 'Besoin d’un compagnon d’étude ?', 'Ask STC assistant': 'Demander à l’assistant STC',
    'Hi! I’m your STC study buddy.': 'Bonjour ! Je suis votre compagnon d’étude STC.',
    'I can help with subjects across every faculty: explain a concept, work through an example, make a quiz or help you revise. What are you studying today?': 'Je peux vous aider dans toutes les facultés : expliquer un concept, résoudre un exemple, créer un quiz ou vous aider à réviser. Qu’étudiez-vous aujourd’hui ?',
    '＋ Follow': '＋ Suivre',
    'Earth Science · Year 1': 'Sciences de la Terre · 1re année',
    'Computer Science · Year 2': 'Informatique · 2e année', 'Biology · Year 1': 'Biologie · 1re année',
    'Applied Sciences · Year 3': 'Sciences appliquées · 3e année', 'Medicine · Year 1': 'Médecine · 1re année',
    'Technology · Year 2': 'Technologie · 2e année', 'Mathematics · Year 1': 'Mathématiques · 1re année',
    'Economics · Year 2': 'Économie · 2e année', 'English Studies · Year 1': 'Études anglaises · 1re année',
    'Law · Year 2': 'Droit · 2e année', 'Psychology · Year 1': 'Psychologie · 1re année',
    'Sports Sciences · Year 2': 'Sciences du sport · 2e année', 'Petroleum Geology · Year 2': 'Géologie pétrolière · 2e année',
    'Change profile photo': 'Modifier la photo de profil', 'Send message': 'Envoyer le message',
    'That’s right! The crust is Earth’s thin, outermost solid layer. ✨ Want another question?': 'Exact ! La croûte est la couche solide, mince et extérieure de la Terre. ✨ Une autre question ?',
    'Good try! The answer is the crust: it is the thin, solid layer at Earth’s surface. Want another question?': 'Bien essayé ! La réponse est la croûte : c’est la fine couche solide à la surface de la Terre. Une autre question ?',
    'Imagine Earth as a peach. The crust is the thin skin we live on. Beneath it is the thick, slowly moving mantle. At the centre is the core: a liquid outer core around a solid inner core. Geologists study these layers using evidence such as earthquake waves.': 'Imaginez que la Terre est une pêche. La croûte est la fine peau sur laquelle nous vivons. En dessous se trouve le manteau épais, qui se déplace lentement. Au centre, le noyau comprend une partie externe liquide et une partie interne solide. Les géologues étudient ces couches grâce, entre autres, aux ondes sismiques.',
    'The rock cycle describes how rocks change over time. Cooling magma forms igneous rock. Weathering breaks rocks into sediment that can become sedimentary rock. Heat and pressure can change either type into metamorphic rock. Melting can start the cycle again.': 'Le cycle des roches décrit leurs transformations au fil du temps. En refroidissant, le magma forme des roches magmatiques. L’altération transforme les roches en sédiments, qui peuvent devenir des roches sédimentaires. La chaleur et la pression produisent des roches métamorphiques. La fusion peut recommencer le cycle.',
    'Earth’s outer shell is split into large plates that move slowly over the softer mantle. Where plates meet, they can move apart, collide or slide past each other. These boundaries help explain mountain building, earthquakes and many volcanoes.': 'L’enveloppe externe de la Terre est divisée en grandes plaques qui se déplacent lentement sur le manteau plus souple. À leurs limites, elles peuvent s’écarter, entrer en collision ou coulisser. Ces mouvements expliquent la formation des montagnes, les séismes et de nombreux volcans.',
    'A mineral is a naturally occurring solid with a consistent chemical composition and crystal structure. A rock is a natural mixture of one or more minerals. Geologists identify minerals using clues such as hardness, streak, lustre and cleavage.': 'Un minéral est un solide naturel dont la composition chimique et la structure cristalline sont définies. Une roche est un assemblage naturel d’un ou plusieurs minéraux. Les géologues identifient les minéraux grâce à leur dureté, leur trace, leur éclat et leur clivage.',
    'Geology is the study of Earth: what it is made of, how it changes, and how its history is recorded in rocks. A good first step is learning minerals, rock types and Earth’s structure.': 'La géologie étudie la Terre : sa composition, ses transformations et les traces de son histoire conservées dans les roches. Pour commencer, étudiez les minéraux, les types de roches et la structure terrestre.',
    'Quick quiz: Which layer is the thin, solid surface of Earth?\n\nA) Crust\nB) Outer core\nC) Mantle\n\nReply A, B or C and I’ll check it.': 'Petit quiz : quelle couche forme la surface mince et solide de la Terre ?\n\nA) La croûte\nB) Le noyau externe\nC) Le manteau\n\nRépondez A, B ou C et je vérifierai.',
    'LEARN TOGETHER. RISE TOGETHER.': 'APPRENEZ ENSEMBLE. PROGRESSEZ ENSEMBLE.',
    'Every point': 'Chaque point', 'takes you ': 'vous rapproche ', 'higher.': 'du sommet.',
    'Earn XP by learning, practicing and passing exams. Climb the leaderboard and claim your place among Algeria’s top learners.': 'Gagnez des XP en apprenant, en vous entraînant et en réussissant vos examens. Grimpez dans le classement et rejoignez les meilleurs étudiants d’Algérie.',
    'Earn XP ': 'Gagner des XP ', 'THE STC LEARNIT RANKS': 'LE CLASSEMENT STC LEARNIT',
    'All time': 'Depuis toujours', 'This week': 'Cette semaine', 'Tournament': 'Tournoi', 'Complete a course step and earn at least 10 XP to appear here.': 'Terminez une étape de cours et gagnez au moins 10 XP pour apparaître ici.', '1st place': '1re place', '2nd place': '2e place', '3rd place': '3e place',
    'Top learners': 'Meilleurs étudiants', 'Sorted by total experience points': 'Triés par total de points d’expérience',
    'RANK': 'RANG', 'STUDENT': 'ÉTUDIANT', 'FACULTY': 'FACULTÉ', 'XP EARNED': 'XP GAGNÉS', 'ALL TIME': 'TOUJOURS',
    'The race starts with your first lesson.': 'La course commence avec votre première leçon.',
    'Your study path': 'Votre parcours', 'LEARN A LITTLE. GROW A LOT.': 'APPRENEZ UN PEU. PROGRESSEZ BEAUCOUP.',
    'YOUR LEARNING PATH': 'VOTRE PARCOURS D’APPRENTISSAGE', 'Unit 1 · Earth basics': 'Unité 1 · Bases de la Terre',
    'Earth layers': 'Couches terrestres', 'Lesson complete': 'Leçon terminée', 'Up next · 5 min': 'À suivre · 5 min',
    'Plate tectonics': 'Tectonique des plaques', 'Unlock next': 'À débloquer', 'day streak!': 'jours de suite !',
    'Short lessons': 'Leçons courtes', 'Make every study break count': 'Profitez de chaque pause pour apprendre',
    'Play to remember': 'Jouez pour retenir', 'Quizzes, games & quick reviews': 'Quiz, jeux et révisions rapides',
    'See your progress': 'Suivez vos progrès', 'Build a streak and earn XP': 'Créez une série et gagnez des XP',
    'Reach the next level': 'Atteignez le niveau suivant', 'Unit tests & final exams': 'Examens d’unité et examens finaux',
    'Pick a subject ': 'Choisir une matière ', 'Practice while you play': 'Apprenez en jouant',
    'Get the idea, clearly': 'Comprendre simplement', 'Break each university subject into focused lessons that are easier to understand and remember.': 'Chaque matière universitaire est divisée en leçons ciblées, plus faciles à comprendre et à retenir.',
    'Use quick quizzes, matching games and challenges to make key concepts stick.': 'Des quiz rapides, jeux d’association et défis pour retenir les notions clés.',
    'Earn your next level': 'Gagnez votre prochain niveau', 'Collect XP, keep your streak, pass unit exams and unlock the next part of your course.': 'Gagnez des XP, gardez votre série, réussissez les examens et débloquez la suite du cours.',
    'See the journey ': 'Voir le parcours ', 'How levels work ': 'Comprendre les niveaux ',
    'ONLINE': 'EN LIGNE', 'OFFLINE': 'HORS LIGNE',
    'Foundations of human biology': 'Bases de la biologie humaine', 'Core ideas in computing': 'Notions fondamentales en informatique',
    'Mathematical foundations': 'Fondements mathématiques', 'How to describe the physical world': 'Décrire le monde physique',
    'Matter and its transformations': 'La matière et ses transformations', 'Living systems': 'Systèmes vivants',
    'Foundations of legal reasoning': 'Fondements du raisonnement juridique', 'How economies work': 'Le fonctionnement des économies',
    'Language and communication': 'Langue et communication', 'People, society and evidence': 'Individus, société et données',
    'Engineering design basics': 'Bases de la conception en ingénierie', 'Energy, Earth and resources': 'Énergie, Terre et ressources',
    'years': 'années', 'min': 'min', 'pairs': 'paires',
    'Every path starts with lessons, then unlocks a game, a checkpoint and a final exam.': 'Chaque parcours commence par des leçons, puis débloque un jeu, une évaluation et un examen final.',
    'Each level attempt costs 10 energy. One energy returns every 5 minutes.': 'Chaque tentative de niveau coûte 10 énergies. Une énergie revient toutes les 5 minutes.', '/ 20 energy': '/ 20 énergie',
    'Each level attempt uses 10 energy, whether you pass or not. Energy returns at one point every five minutes.': 'Chaque tentative coûte 10 énergies, que vous réussissiez ou non. Une énergie revient toutes les cinq minutes.',
    'Foundations': 'Fondations', 'Core skills': 'Compétences fondamentales', 'Applied understanding': 'Compréhension appliquée', 'Advanced connections': 'Liens avancés', 'Mastery': 'Maîtrise',
    '5 units · 20 levels each': '5 unités · 20 niveaux chacune', 'All 100 levels complete': 'Les 100 niveaux sont terminés', 'Full': 'Pleine',
    'LESSONS · GAME · EXAM': 'LEÇONS · JEU · EXAMEN', 'PRACTICE GAME': 'JEU D’ENTRAÎNEMENT',
    'YOUR LEARNING PATH · Faculty of Hydrocarbons, Renewable Energy, Earth & Universe Sciences': 'VOTRE PARCOURS · Faculté des hydrocarbures, des énergies renouvelables, des sciences de la Terre et de l’Univers',
    'YOUR LEARNING PATH · Faculty of Medicine': 'VOTRE PARCOURS · Faculté de médecine',
    'YOUR LEARNING PATH · Faculty of New Information Technologies & Communication': 'VOTRE PARCOURS · Faculté des nouvelles technologies de l’information et de la communication',
    'YOUR LEARNING PATH · Faculty of Natural Sciences and Life': 'VOTRE PARCOURS · Faculté des sciences de la nature et de la vie',
    'YOUR LEARNING PATH · Faculty of Applied Sciences': 'VOTRE PARCOURS · Faculté des sciences appliquées',
    'YOUR LEARNING PATH · Faculty of Mathematics and Matter Sciences': 'VOTRE PARCOURS · Faculté des mathématiques et des sciences de la matière',
    'YOUR LEARNING PATH · Faculty of Economics, Commercial Sciences and Management': 'VOTRE PARCOURS · Faculté des sciences économiques, commerciales et des sciences de gestion',
    'YOUR LEARNING PATH · Faculty of Arts and Languages': 'VOTRE PARCOURS · Faculté des lettres et des langues',
    'YOUR LEARNING PATH · Faculty of Law and Political Sciences': 'VOTRE PARCOURS · Faculté de droit et des sciences politiques',
    'YOUR LEARNING PATH · Faculty of Humanities and Social Sciences': 'VOTRE PARCOURS · Faculté des sciences humaines et sociales',
    'YOUR LEARNING PATH · Institute of Technology': 'VOTRE PARCOURS · Institut de technologie',
    'YOUR LEARNING PATH · Institute of Science and Techniques of Physical and Sporting Activities': 'VOTRE PARCOURS · Institut des sciences et techniques des activités physiques et sportives',
    'YOUR PROGRESS': 'VOTRE PROGRESSION', 'Level complete!': 'Niveau terminé !',
    'Match each key idea to the correct meaning. You have learned all the concepts in the lessons above, so use those ideas to clear the board.': 'Associez chaque notion à sa définition. Vous avez étudié ces concepts dans les leçons précédentes : utilisez vos acquis pour terminer le jeu.',
    'Tap a concept, then choose its matching meaning.': 'Sélectionnez une notion, puis choisissez sa définition.',
    'Start matching ': 'Commencer le jeu ', 'Match all pairs': 'Associez toutes les paires', 'Finish game': 'Terminer le jeu',
    'Choose a concept first.': 'Choisissez d’abord une notion.', 'Nice match!': 'Bonne association !', 'Not a match yet. Try another meaning.': 'Ce n’est pas la bonne définition. Essayez-en une autre.',
    'All pairs matched. Great recall!': 'Toutes les paires sont associées. Excellente mémoire !', 'Great matching!': 'Bravo pour ces associations !',
    'You matched every concept. ': 'Vous avez associé toutes les notions. ', ' Your checkpoint is now unlocked.': ' Votre évaluation est maintenant débloquée.',
    'Continue learning ': 'Continuer à apprendre ', 'Next question': 'Question suivante', 'Finish practice': 'Terminer l’entraînement',
    'Brilliant work!': 'Excellent travail !', 'One more round?': 'Encore un essai ?', 'Review the lesson and try again—you need ': 'Revoyez la leçon et réessayez : il vous faut ',
    ' correct to pass.': ' bonnes réponses pour réussir.', 'Keep your momentum going.': 'Continuez sur votre lancée.',
    'The crust is Earth’s thin, solid outer layer. It forms the surface we live on.': 'La croûte est la couche externe, mince et solide de la Terre. Elle forme la surface sur laquelle nous vivons.',
    'Earth’s liquid outer core surrounds the solid inner core.': 'Le noyau externe liquide de la Terre entoure le noyau interne solide.',
    'Minerals have a defined composition and crystal structure; rocks are mixtures of one or more minerals.': 'Les minéraux ont une composition et une structure cristalline définies ; les roches sont des assemblages d’un ou plusieurs minéraux.',
    'When plates converge, the crust can crumple into mountain ranges, or one plate can move beneath another.': 'Lorsque les plaques convergent, la croûte peut se plisser et former des montagnes, ou une plaque peut passer sous l’autre.',
    'Friction and sudden movement along plate boundaries can produce earthquakes.': 'Les frottements et les mouvements soudains aux limites des plaques peuvent provoquer des séismes.',
    'The outer core is liquid; the inner core is solid.': 'Le noyau externe est liquide ; le noyau interne est solide.',
    'Rocks are natural materials made of one or more minerals.': 'Les roches sont des matériaux naturels constitués d’un ou plusieurs minéraux.',
    'Tectonic plates move over the softer, slowly moving mantle.': 'Les plaques tectoniques se déplacent sur le manteau, plus souple et animé de mouvements lents.',
    'Plate boundaries are associated with earthquakes, volcanoes and mountain building.': 'Les limites des plaques sont associées aux séismes, aux volcans et à la formation des montagnes.',
    'Earth basics': 'Les bases de la Terre', 'Earth basics checkpoint': 'Évaluation des bases de la Terre', 'Earth science level exam': 'Examen de niveau en sciences de la Terre',
    'Earth science concept match': 'Association de notions en sciences de la Terre',
    'Foundations of human biology': 'Bases de la biologie humaine', 'Cells: the body’s building blocks': 'Les cellules, briques de base du corps',
    'From tissues to organ systems': 'Des tissus aux systèmes d’organes', 'Homeostasis keeps balance': 'L’homéostasie maintient l’équilibre',
    'Cells are the smallest living units. The cell membrane controls what enters and leaves; the nucleus stores DNA; mitochondria release usable energy.': 'Les cellules sont les plus petites unités vivantes. La membrane contrôle les échanges, le noyau contient l’ADN et les mitochondries libèrent l’énergie utilisable.',
    'Similar cells form tissues, tissues combine into organs, and organs work together in systems. The cardiovascular system transports oxygen and nutrients.': 'Des cellules semblables forment des tissus, qui constituent des organes. Les organes coopèrent au sein de systèmes. Le système cardiovasculaire transporte l’oxygène et les nutriments.',
    'Homeostasis maintains stable internal conditions. Feedback systems detect a change and trigger a response, such as sweating when body temperature rises.': 'L’homéostasie maintient la stabilité du milieu intérieur. Des systèmes de régulation détectent les changements et déclenchent une réponse, comme la transpiration lorsque la température augmente.',
    'Which structure controls what enters a cell?': 'Quelle structure contrôle les entrées et les sorties de la cellule ?', 'Cell membrane': 'Membrane cellulaire',
    'Mitochondria release energy for the cell.': 'Les mitochondries libèrent l’énergie nécessaire à la cellule.',
    'What is formed when similar cells work together?': 'Que forment des cellules semblables qui fonctionnent ensemble ?', 'A tissue': 'Un tissu',
    'An organ system is made of organs working together.': 'Un système d’organes regroupe des organes qui fonctionnent ensemble.',
    'What is homeostasis?': 'Qu’est-ce que l’homéostasie ?', 'Keeping internal conditions stable': 'Maintenir la stabilité du milieu intérieur',
    'Sweating helps return body temperature toward its normal range.': 'La transpiration aide à ramener la température corporelle vers sa valeur normale.',
    'Core ideas in computing': 'Notions fondamentales en informatique', 'Representing information': 'Représenter l’information',
    'Algorithms and programs': 'Algorithmes et programmes', 'Data and networks': 'Données et réseaux',
    'Computers represent information using bits: 0 and 1. Eight bits form a byte. Text, images and sound are encoded as patterns of bits.': 'Les ordinateurs représentent l’information avec des bits, 0 et 1. Huit bits forment un octet. Les textes, images et sons sont codés sous forme de séquences de bits.',
    'An algorithm is a clear sequence of steps for solving a problem. A program expresses those steps in a language a computer can execute.': 'Un algorithme est une suite claire d’étapes pour résoudre un problème. Un programme exprime ces étapes dans un langage exécutable par l’ordinateur.',
    'A network connects devices so they can exchange data. Protocols define the rules for sending and receiving information.': 'Un réseau relie des appareils afin qu’ils échangent des données. Les protocoles définissent les règles d’envoi et de réception de l’information.',
    'How many bits are in a byte?': 'Combien de bits contient un octet ?', 'Eight': 'Huit', 'A byte contains eight bits.': 'Un octet contient huit bits.',
    'What is an algorithm?': 'Qu’est-ce qu’un algorithme ?', 'A sequence of steps to solve a problem': 'Une suite d’étapes pour résoudre un problème',
    'Programs implement algorithms using code.': 'Les programmes mettent les algorithmes en œuvre à l’aide de code.',
    'What do network protocols define?': 'Que définissent les protocoles réseau ?', 'Rules for exchanging data': 'Les règles d’échange des données',
    'Protocols help connected devices communicate reliably.': 'Les protocoles permettent aux appareils connectés de communiquer de manière fiable.',
    'Mathematical foundations': 'Fondements mathématiques', 'Variables and expressions': 'Variables et expressions',
    'Equations and balance': 'Équations et équilibre', 'Functions describe relationships': 'Les fonctions décrivent des relations',
    'A variable stands for a value. An expression combines values and operations; simplifying it preserves its value while making its form clearer.': 'Une variable représente une valeur. Une expression combine des valeurs et des opérations ; la simplifier conserve sa valeur tout en clarifiant sa forme.',
    'An equation states that two expressions are equal. Apply the same operation to both sides to keep the equality balanced while solving.': 'Une équation affirme que deux expressions sont égales. Appliquez la même opération aux deux membres pour préserver l’égalité pendant la résolution.',
    'A function maps each allowed input to exactly one output. Its rule can be shown with an equation, table or graph.': 'Une fonction associe à chaque entrée autorisée une seule sortie. Sa règle peut être représentée par une équation, un tableau ou un graphique.',
    'In 3x + 2, what does x represent?': 'Dans 3x + 2, que représente x ?', 'A variable value': 'La valeur d’une variable',
    'The variable x can take different values.': 'La variable x peut prendre différentes valeurs.',
    'What keeps an equation balanced?': 'Qu’est-ce qui maintient l’équilibre d’une équation ?', 'Doing the same operation to both sides': 'Effectuer la même opération des deux côtés',
    'This preserves equality as you isolate the unknown.': 'Cela préserve l’égalité pendant que vous isolez l’inconnue.',
    'How many outputs does a function assign to one input?': 'Combien de sorties une fonction associe-t-elle à une entrée ?', 'Exactly one': 'Une seule',
    'That one-output rule defines a function.': 'Cette règle d’une seule sortie caractérise une fonction.',
    'How to describe the physical world': 'Décrire le monde physique', 'Measure with units': 'Mesurer avec des unités', 'Motion and speed': 'Mouvement et vitesse', 'Forces change motion': 'Les forces modifient le mouvement',
    'Physical quantities combine a number and a unit. SI units give scientists a shared standard for comparing measurements.': 'Une grandeur physique associe un nombre et une unité. Les unités SI fournissent une référence commune pour comparer les mesures.',
    'Speed describes distance travelled per unit time: speed = distance ÷ time. Velocity also includes direction.': 'La vitesse correspond à la distance parcourue par unité de temps : vitesse = distance ÷ temps. La vélocité indique aussi une direction.',
    'A net force changes an object’s motion. Newton’s second law relates net force, mass and acceleration: F = ma.': 'Une force résultante modifie le mouvement d’un objet. La deuxième loi de Newton relie force, masse et accélération : F = ma.',
    'What does a physical measurement need besides a number?': 'De quoi une mesure physique a-t-elle besoin en plus d’un nombre ?', 'A unit': 'Une unité',
    'Units make measured quantities interpretable and comparable.': 'Les unités rendent les grandeurs mesurées compréhensibles et comparables.',
    'A student travels 100 m in 20 s. What is the speed?': 'Un étudiant parcourt 100 m en 20 s. Quelle est sa vitesse ?', '5 m/s': '5 m/s',
    '100 divided by 20 equals 5 metres per second.': '100 divisé par 20 égale 5 mètres par seconde.',
    'What happens when an unbalanced net force acts?': 'Que se passe-t-il lorsqu’une force résultante non équilibrée agit ?', 'The object accelerates': 'L’objet accélère',
    'Acceleration is a change in velocity caused by net force.': 'L’accélération est une variation de vélocité provoquée par une force résultante.',
    'Matter and its transformations': 'La matière et ses transformations', 'Atoms and elements': 'Atomes et éléments', 'Molecules and bonds': 'Molécules et liaisons', 'Chemical reactions': 'Réactions chimiques',
    'Atoms contain protons, neutrons and electrons. The number of protons identifies the element; atoms of one element share that proton number.': 'Les atomes contiennent des protons, des neutrons et des électrons. Le nombre de protons identifie l’élément ; les atomes d’un même élément partagent ce nombre.',
    'Atoms bond by sharing or transferring electrons. A molecule is a group of atoms held together by chemical bonds.': 'Les atomes se lient en partageant ou en transférant des électrons. Une molécule est un groupe d’atomes unis par des liaisons chimiques.',
    'In a chemical reaction, atoms rearrange into new substances. Atoms are conserved, so the total number of each type stays the same.': 'Lors d’une réaction chimique, les atomes se réorganisent pour former de nouvelles substances. Ils sont conservés : le nombre de chaque type d’atome reste le même.',
    'What identifies an element?': 'Qu’est-ce qui identifie un élément ?', 'Its number of protons': 'Son nombre de protons', 'This is the atomic number.': 'C’est le numéro atomique.',
    'What holds atoms together in a molecule?': 'Qu’est-ce qui unit les atomes dans une molécule ?', 'Chemical bonds': 'Les liaisons chimiques',
    'Bonds result from interactions involving electrons.': 'Les liaisons résultent d’interactions impliquant les électrons.',
    'What happens to atoms in a reaction?': 'Que deviennent les atomes dans une réaction ?', 'They rearrange': 'Ils se réorganisent',
    'The atoms are conserved while their bonds and groupings change.': 'Les atomes sont conservés tandis que leurs liaisons et leurs regroupements changent.',
    'Living systems': 'Systèmes vivants', 'Cells and life': 'Cellules et vie', 'Ecosystems and energy': 'Écosystèmes et énergie', 'Variation and adaptation': 'Variation et adaptation',
    'Cells are the basic units of life. Organisms may be single-celled or multicellular, with specialised cells performing different functions.': 'Les cellules sont les unités fondamentales de la vie. Les organismes peuvent être unicellulaires ou pluricellulaires, avec des cellules spécialisées remplissant différentes fonctions.',
    'An ecosystem includes organisms and their physical environment. Energy flows through food chains, while matter cycles between organisms and the environment.': 'Un écosystème comprend les organismes et leur milieu physique. L’énergie circule dans les chaînes alimentaires, tandis que la matière se recycle entre les organismes et l’environnement.',
    'Individuals in a population vary. Inherited traits that improve survival and reproduction can become more common over generations.': 'Les individus d’une population présentent des variations. Les caractères héréditaires qui favorisent la survie et la reproduction peuvent devenir plus fréquents au fil des générations.',
    'What is the basic unit of life?': 'Quelle est l’unité fondamentale de la vie ?', 'The cell': 'La cellule', 'All living organisms are made of one or more cells.': 'Tous les organismes vivants sont constitués d’une ou de plusieurs cellules.',
    'What flows through a food chain?': 'Qu’est-ce qui circule dans une chaîne alimentaire ?', 'Energy': 'L’énergie',
    'Energy enters ecosystems, often through producers, and moves between organisms.': 'L’énergie entre dans les écosystèmes, souvent grâce aux producteurs, puis circule entre les organismes.',
    'What can happen to helpful inherited traits over generations?': 'Que peut-il advenir des caractères héréditaires avantageux au fil des générations ?', 'They can become more common': 'Ils peuvent devenir plus fréquents',
    'This is a key mechanism of natural selection.': 'C’est un mécanisme important de la sélection naturelle.',
    'Foundations of legal reasoning': 'Fondements du raisonnement juridique', 'Rules and legal sources': 'Règles et sources du droit', 'Rights and duties': 'Droits et obligations', 'Reasoning from rules': 'Raisonner à partir des règles',
    'A legal system uses recognised sources such as legislation and regulations. The applicable source depends on the issue and the relevant jurisdiction.': 'Un système juridique s’appuie sur des sources reconnues, telles que les lois et les règlements. La source applicable dépend de la question et de la juridiction concernée.',
    'Rights protect interests or freedoms, while duties require or prohibit certain conduct. Legal analysis considers both sides and the rules connecting them.': 'Les droits protègent des intérêts ou des libertés, tandis que les obligations imposent ou interdisent certains comportements. L’analyse juridique considère les deux et les règles qui les relient.',
    'Legal reasoning identifies the facts, selects a relevant rule, then explains how the rule applies to those facts and supports a conclusion.': 'Le raisonnement juridique identifie les faits, choisit une règle pertinente, puis explique comment elle s’applique aux faits et permet de tirer une conclusion.',
    'Why identify the relevant jurisdiction?': 'Pourquoi faut-il identifier la juridiction concernée ?', 'It determines which rules apply': 'Elle détermine les règles applicables',
    'Legal rules and competent institutions vary by jurisdiction.': 'Les règles juridiques et les institutions compétentes varient selon la juridiction.',
    'What does a legal duty do?': 'Que fait une obligation juridique ?', 'Requires or prohibits conduct': 'Elle impose ou interdit un comportement',
    'Duties set legally expected or forbidden actions.': 'Les obligations définissent les actes exigés ou interdits par le droit.',
    'What should follow identifying a relevant rule?': 'Que faut-il faire après avoir identifié une règle pertinente ?', 'Apply it to the facts': 'L’appliquer aux faits',
    'Connecting rule and facts makes the conclusion reasoned.': 'Relier la règle aux faits permet de justifier la conclusion.',
    'How economies work': 'Le fonctionnement des économies', 'Scarcity and choice': 'Rareté et choix', 'Supply and demand': 'Offre et demande', 'Reading economic indicators': 'Lire les indicateurs économiques',
    'Resources are limited while wants can exceed them. Scarcity means choices have an opportunity cost: the best alternative not chosen.': 'Les ressources sont limitées alors que les besoins peuvent les dépasser. La rareté implique un coût d’opportunité : la meilleure option à laquelle on renonce.',
    'Demand describes how much buyers are willing and able to purchase. Supply describes how much sellers are willing and able to offer at different prices.': 'La demande indique les quantités que les acheteurs souhaitent et peuvent acquérir. L’offre indique celles que les vendeurs souhaitent et peuvent proposer selon le prix.',
    'Indicators such as inflation and unemployment summarise parts of economic activity. They need context and should not be treated as complete descriptions on their own.': 'Des indicateurs comme l’inflation et le chômage résument certains aspects de l’activité économique. Ils doivent être contextualisés et ne suffisent pas à eux seuls à décrire toute la situation.',
    'What is opportunity cost?': 'Qu’est-ce que le coût d’opportunité ?', 'The best alternative given up': 'La meilleure option à laquelle on renonce',
    'It is the value of the next-best option forgone.': 'Il correspond à la valeur de la meilleure option abandonnée.',
    'Which side represents sellers?': 'Quel élément représente les vendeurs ?', 'Supply': 'L’offre', 'Supply describes what sellers offer at different prices.': 'L’offre décrit ce que les vendeurs proposent à différents prix.',
    'What does inflation track?': 'Que mesure l’inflation ?', 'A general rise in prices': 'Une hausse générale des prix',
    'Inflation measures the rate at which the general price level rises.': 'L’inflation mesure le rythme de hausse du niveau général des prix.',
    'Language and communication': 'Langue et communication', 'Meaning in context': 'Le sens en contexte', 'Build clear sentences': 'Construire des phrases claires', 'Read for the main idea': 'Repérer l’idée principale',
    'Words can change meaning depending on context, audience and register. Careful readers use surrounding details to infer the intended sense.': 'Le sens des mots varie selon le contexte, le public et le registre. Un lecteur attentif s’appuie sur les indices environnants pour comprendre le sens voulu.',
    'A clear sentence expresses a complete idea. Agreement, word order and punctuation help readers follow the relationship between ideas.': 'Une phrase claire exprime une idée complète. Les accords, l’ordre des mots et la ponctuation aident à comprendre les liens entre les idées.',
    'A text’s main idea is its central point. Supporting details explain, illustrate or provide evidence for that point.': 'L’idée principale d’un texte en exprime le point central. Les détails la précisent, l’illustrent ou l’étayent.',
    'What helps resolve an ambiguous word?': 'Qu’est-ce qui aide à comprendre un mot ambigu ?', 'Its context': 'Son contexte',
    'Nearby ideas and the communication setting guide interpretation.': 'Les idées voisines et la situation de communication guident l’interprétation.',
    'What helps readers see how ideas relate?': 'Qu’est-ce qui aide à comprendre les liens entre les idées ?', 'Sentence structure and punctuation': 'La structure de la phrase et la ponctuation',
    'Structure and punctuation make meaning easier to follow.': 'La structure et la ponctuation facilitent la compréhension du sens.',
    'What is a supporting detail for?': 'À quoi sert un détail justificatif ?', 'To explain or evidence the main idea': 'À expliquer ou étayer l’idée principale',
    'Details develop the central point of a text.': 'Les détails développent le point central d’un texte.',
    'People, society and evidence': 'Individus, société et données', 'People in social contexts': 'Les individus dans leur contexte social', 'Evidence and research': 'Données et recherche', 'Interpreting findings': 'Interpréter les résultats',
    'Social sciences study people, groups and institutions. Behaviour is shaped by interactions between individuals and their social and historical contexts.': 'Les sciences sociales étudient les individus, les groupes et les institutions. Les comportements sont façonnés par les interactions et les contextes sociaux et historiques.',
    'Research questions guide the choice of methods. Surveys, interviews and observations each provide different kinds of evidence and have limitations.': 'Les questions de recherche orientent le choix des méthodes. Les enquêtes, les entretiens et les observations fournissent des données différentes et comportent chacun des limites.',
    'A finding describes evidence from a study. Researchers consider sample, context and limitations before deciding how broadly a result may apply.': 'Un résultat décrit les données d’une étude. Les chercheurs examinent l’échantillon, le contexte et les limites avant de déterminer la portée d’un résultat.',
    'What do social sciences examine?': 'Qu’étudient les sciences sociales ?', 'People, groups and institutions': 'Les individus, les groupes et les institutions',
    'These fields study human life and social organisation.': 'Ces disciplines étudient la vie humaine et l’organisation sociale.',
    'Why choose a method to fit the question?': 'Pourquoi adapter la méthode à la question ?', 'Methods produce different kinds of evidence': 'Les méthodes produisent différents types de données',
    'The method affects what can be learned and what limitations apply.': 'La méthode détermine ce que l’on peut apprendre et les limites à prendre en compte.',
    'What should be considered before generalising a result?': 'Que faut-il considérer avant de généraliser un résultat ?', 'The sample and study limitations': 'L’échantillon et les limites de l’étude',
    'Findings may not apply beyond the people or setting studied.': 'Les résultats ne s’appliquent pas nécessairement au-delà des personnes ou du contexte étudiés.',
    'Engineering design basics': 'Bases de la conception en ingénierie', 'Define the problem': 'Définir le problème', 'Compare design options': 'Comparer les solutions de conception', 'Test and improve': 'Tester et améliorer',
    'Engineering starts by identifying a need, users and constraints. A clear problem statement guides solutions and makes success measurable.': 'L’ingénierie commence par l’identification d’un besoin, des utilisateurs et des contraintes. Une définition claire du problème oriente les solutions et rend leur réussite mesurable.',
    'Engineers compare concepts against requirements such as safety, cost and performance. Trade-offs help explain why one option may suit a context better.': 'Les ingénieurs comparent les solutions selon des critères comme la sécurité, le coût et la performance. Les compromis expliquent pourquoi une option convient mieux à un contexte donné.',
    'A prototype makes an idea testable. Measurements and feedback reveal gaps, allowing engineers to refine the design through iteration.': 'Un prototype permet de tester une idée. Les mesures et les retours révèlent les améliorations nécessaires pour affiner la conception par itérations.',
    'What guides a useful design solution?': 'Qu’est-ce qui oriente une solution de conception pertinente ?', 'The need, users and constraints': 'Le besoin, les utilisateurs et les contraintes',
    'These define the problem the design must solve.': 'Ces éléments définissent le problème que la conception doit résoudre.',
    'What is a design trade-off?': 'Qu’est-ce qu’un compromis de conception ?', 'A compromise between requirements': 'Un compromis entre plusieurs exigences',
    'Improving one requirement may affect another.': 'L’amélioration d’un critère peut en affecter un autre.',
    'Why build a prototype?': 'Pourquoi construire un prototype ?', 'To test and improve an idea': 'Pour tester et améliorer une idée',
    'Testing provides evidence for the next design iteration.': 'Les tests apportent des données pour la prochaine itération de conception.',
    'Energy, Earth and resources': 'Énergie, Terre et ressources', 'Energy forms and transfer': 'Formes et transferts d’énergie', 'Resources and systems': 'Ressources et systèmes', 'Evidence for decisions': 'Des données pour décider',
    'Energy can be stored in different forms and transferred between systems. Conservation means it changes form or location rather than disappearing.': 'L’énergie peut être stockée sous différentes formes et transférée entre des systèmes. La conservation signifie qu’elle change de forme ou de lieu sans disparaître.',
    'Natural and engineered systems connect resources, processes and outputs. Understanding these links helps evaluate efficiency and impacts.': 'Les systèmes naturels et techniques relient ressources, processus et résultats. Comprendre ces liens aide à évaluer l’efficacité et les impacts.',
    'Reliable decisions use measurements, compare alternatives and consider uncertainty, environmental effects and local needs.': 'Des décisions fiables s’appuient sur des mesures, comparent les solutions et tiennent compte des incertitudes, des effets environnementaux et des besoins locaux.',
    'What does energy conservation mean?': 'Que signifie la conservation de l’énergie ?', 'Energy changes form or location': 'L’énergie change de forme ou de lieu',
    'Energy is not destroyed in a transfer.': 'L’énergie n’est pas détruite lors d’un transfert.',
    'Why map system inputs and outputs?': 'Pourquoi représenter les entrées et les sorties d’un système ?', 'To understand efficiency and impacts': 'Pour comprendre l’efficacité et les impacts',
    'A system view reveals where resources go and what effects result.': 'Une vue d’ensemble du système montre le devenir des ressources et les effets produits.',
    'What should accompany a measurement?': 'Qu’est-ce qui doit accompagner une mesure ?', 'Its uncertainty and context': 'Son incertitude et son contexte',
    'Evidence is more useful when its limits and setting are clear.': 'Les données sont plus utiles lorsque leur contexte et leurs limites sont connus.',
    'Which idea best matches': 'Quelle notion correspond le mieux à', 'Not ': 'Pas ', 'None of these': 'Aucune de ces réponses',
    'Match each key idea to its meaning.': 'Associez chaque notion à sa définition.', 'Review the three lessons.': 'Révisez les trois leçons.',
    'Pass to complete this level.': 'Réussissez pour terminer ce niveau.', 'You need at least 2 correct answers to pass this checkpoint.': 'Il vous faut au moins 2 bonnes réponses pour réussir cette évaluation.',
    'Your level finale! Get at least 4 out of 5 correct. You can retry at any time.': 'L’examen final du niveau ! Obtenez au moins 4 bonnes réponses sur 5. Vous pouvez réessayer à tout moment.',
    'LESSON 01': 'LEÇON 01', 'LESSON 02': 'LEÇON 02', 'LESSON 03': 'LEÇON 03', 'UNIT CHECKPOINT': 'ÉVALUATION DE L’UNITÉ', 'FINAL EXAM': 'EXAMEN FINAL',
    'PRACTICE GAME': 'JEU D’ENTRAÎNEMENT', 'YOUR LEARNING PATH': 'VOTRE PARCOURS D’APPRENTISSAGE', 'YOUR PROGRESS': 'VOTRE PROGRESSION',
    '160 XP available': '160 XP disponibles', '✦ 160 XP available': '✦ 160 XP disponibles', '+20 XP': '+20 XP', '3 pairs': '3 paires', 'faculties': 'facultés',
    'Explore faculties and study areas from Kasdi Merbah University. Get AI study support, then build your skills with guided lessons, quizzes, games and exams.': 'Explorez les facultés et les domaines d’études de l’Université Kasdi Merbah. Bénéficiez de l’aide de l’assistant IA et progressez grâce à des leçons, des quiz, des jeux et des examens.',
    'AI responses can make mistakes. Verify important information with your course materials and avoid sharing sensitive personal details.': 'Les réponses de l’IA peuvent contenir des erreurs. Vérifiez les informations importantes dans vos supports de cours et ne partagez pas de données personnelles sensibles.',
    'Choose your subject, follow focused lessons, and practice with quizzes before your exams. Your learning path is ready to explore.': 'Choisissez votre matière, suivez des leçons ciblées et entraînez-vous avec des quiz avant vos examens. Votre parcours d’apprentissage vous attend.',
    'Find classmates by Learnit ID, discover students in your faculty, and follow their study journeys.': 'Trouvez des camarades avec leur identifiant Learnit, découvrez des étudiants de votre faculté et suivez leurs parcours.',
    'Your first lesson starts the climb.': 'Votre ascension commence par une première leçon.',
    'Choose a subject, sharpen your skills and earn XP as you learn.': 'Choisissez une matière, développez vos compétences et gagnez des XP en apprenant.',
    'Learn, practice and earn XP as you make progress through your university subjects.': 'Apprenez, entraînez-vous et gagnez des XP tout au long de votre parcours universitaire.',
    'You passed the final exam. Keep learning to build your skills and earn XP.': 'Vous avez réussi l’examen final. Continuez à apprendre, à développer vos compétences et à gagner des XP.',
    'Complete the lessons to unlock the matching game, checkpoint and final exam. Your progress is saved automatically.': 'Terminez les leçons pour débloquer le jeu d’association, l’évaluation et l’examen final. Votre progression est enregistrée automatiquement.',
    'AI study support can make mistakes. Verify important information with your course materials and avoid sharing sensitive personal details.': 'Les réponses de l’IA peuvent contenir des erreurs. Vérifiez les informations importantes dans vos supports de cours et ne partagez pas de données personnelles sensibles.',
    'Profile updated ✓': 'Profil mis à jour ✓', 'Profile photo updated.': 'Photo de profil mise à jour.',
    'No students found with this Learnit ID. Check the ID and try again.': 'Aucun étudiant trouvé avec cet identifiant Learnit. Vérifiez-le et réessayez.',
    'No students to show for this faculty. Try searching by Learnit ID.': 'Aucun étudiant à afficher pour cette faculté. Essayez une recherche par identifiant Learnit.',
    'Mineral': 'Minéral', 'Tectonic plates': 'Plaques tectoniques',
    'Cells are the smallest living units.': 'Les cellules sont les plus petites unités vivantes.',
    'Computers represent information using bits: 0 and 1.': 'Les ordinateurs représentent l’information avec des bits : 0 et 1.',
    'A variable stands for a value.': 'Une variable représente une valeur.',
    'Physical quantities combine a number and a unit.': 'Une grandeur physique associe un nombre et une unité.',
    'Atoms contain protons, neutrons and electrons.': 'Les atomes contiennent des protons, des neutrons et des électrons.',
    'Cells are the basic units of life.': 'Les cellules sont les unités fondamentales de la vie.',
    'A legal system uses recognised sources such as legislation and regulations.': 'Un système juridique s’appuie sur des sources reconnues telles que les lois et les règlements.',
    'Resources are limited while wants can exceed them.': 'Les ressources sont limitées alors que les besoins peuvent les dépasser.',
    'Words can change meaning depending on context, audience and register.': 'Le sens des mots varie selon le contexte, le public et le registre.',
    'Social sciences study people, groups and institutions.': 'Les sciences sociales étudient les individus, les groupes et les institutions.',
    'Engineering starts by identifying a need, users and constraints.': 'L’ingénierie commence par l’identification d’un besoin, des utilisateurs et des contraintes.',
    'Energy can be stored in different forms and transferred between systems.': 'L’énergie peut être stockée sous différentes formes et transférée entre des systèmes.',
    'Crust, mantle and core arranged from the surface inward.': 'La croûte, le manteau et le noyau, de la surface vers le centre.',
    'A natural solid with a consistent composition and crystal structure.': 'Un solide naturel à la composition et à la structure cristalline constantes.',
    'Pieces of Earth’s outer shell that move slowly.': 'Des fragments de l’enveloppe terrestre qui se déplacent lentement.',
    'My Profile — STC Learnit': 'Mon profil — STC Learnit',
    'STC Learnit — the study journey built for Algerian university students.': 'STC Learnit — le parcours d’apprentissage conçu pour les étudiants universitaires algériens.',
    'See the STC Learnit XP leaderboard.': 'Consultez le classement des XP sur STC Learnit.',
    'Learn, practice, earn XP and climb through your university study path on STC Learnit.': 'Apprenez, entraînez-vous, gagnez des XP et progressez dans votre parcours universitaire avec STC Learnit.',
    'Your STC Learnit student profile.': 'Votre profil étudiant STC Learnit.'
  };
  const attributeTranslations = {
    'Search faculties and institutes': 'Rechercher des facultés et instituts',
    'Search faculties or subjects…': 'Rechercher des facultés ou des matières…',
    'SEARCH BY ID · EXAMPLE: STC-4K8R2A': 'RECHERCHER PAR ID · EXEMPLE : STC-4K8R2A',
    'Choose a faculty…': 'Choisissez une faculté…',
    'Switch to French': 'Passer en français', 'Switch to English': 'Passer en anglais',
    'Switch to light mode': 'Passer en mode clair', 'Switch to dark mode': 'Passer en mode sombre',
    'Dark mode': 'Mode sombre', 'Search by Learnit ID': 'Rechercher par identifiant Learnit',
    'Toggle light and dark mode': 'Basculer entre les modes clair et sombre',
    'Open menu': 'Ouvrir le menu', 'Close announcement': 'Fermer l’annonce',
    'Change profile photo': 'Modifier la photo de profil', 'STC Learnit home': 'Accueil de STC Learnit'
  };
  const translationLookup = new Map(Object.entries(translations).map(([key, value]) => [key.trim(), value]));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalTitle = document.title;
  let language = 'en';
  function localize(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      // Authentication updates this label from the live Supabase session.
      // Keep the language observer from restoring its original static text.
      if (node.parentElement?.closest('#loginBtn,#energyCount,#energyTimer,#energyMessage')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const key = source.trim();
      if (!key) continue;
      let translated = language === 'fr' ? translationLookup.get(key) : source;
      if (language === 'fr' && translated === undefined) {
        const courseTitle = key.match(/^(Licence · Year [123]|Master · Year [12]) · your first unit starts here\.$/);
        if (!translated && courseTitle) translated = `${translationLookup.get(courseTitle[1])} · votre première unité commence ici.`;
        const classmates = key.match(/^(\d+) (classmate|classmates) found$/);
        if (!translated && classmates) translated = `${classmates[1]} camarade${classmates[1] === '1' ? '' : 's'} trouvé${classmates[1] === '1' ? '' : 's'}`;
        const facultyCount = key.match(/^(Faculty|Institute) · (\d+) departments?$/);
        if (!translated && facultyCount) translated = `${facultyCount[1] === 'Faculty' ? 'Faculté' : 'Institut'} · ${facultyCount[2]} département${facultyCount[2] === '1' ? '' : 's'}`;
        const stepCount = key.match(/^(\d+) \/ (\d+) STEPS$/);
        if (!translated && stepCount) translated = `${stepCount[1]} / ${stepCount[2]} ÉTAPES`;
        const levelLabel = key.match(/^LEVEL (\d+)$/);
        if (!translated && levelLabel) translated = `NIVEAU ${levelLabel[1]}`;
        const levelProgress = key.match(/^Level (\d+)$/);
        if (!translated && levelProgress) translated = `Niveau ${levelProgress[1]}`;
        const currentLevelProgress = key.match(/^Current level (\d+)$/);
        if (!translated && currentLevelProgress) translated = `Niveau actuel ${currentLevelProgress[1]}`;
        const levelOutOfHundred = key.match(/^LEVEL (\d+) \/ 100$/);
        if (!translated && levelOutOfHundred) translated = `NIVEAU ${levelOutOfHundred[1]} / 100`;
        const unitLevels = key.match(/^UNIT (\d+) · 20 LEVELS$/);
        if (!translated && unitLevels) translated = `UNITÉ ${unitLevels[1]} · 20 NIVEAUX`;
        const unitTitle = key.match(/^(Foundations|Core skills|Applied understanding|Advanced connections|Mastery) · (.+)$/);
        if (!translated && unitTitle) { const difficulty = unitTitle[1]; translated = `${translationLookup.get(difficulty) || difficulty} · ${translationLookup.get(unitTitle[2]) || unitTitle[2]}`; }
        const levelsTotal = key.match(/^(\d+) \/ 100 LEVELS$/);
        if (!translated && levelsTotal) translated = `${levelsTotal[1]} / 100 NIVEAUX`;
        const levelChallenge = key.match(/^LEVEL (\d+) · (FOUNDATIONS|CORE SKILLS|APPLIED UNDERSTANDING|ADVANCED CONNECTIONS|MASTERY)$/);
        if (!translated && levelChallenge) { const difficulty = levelChallenge[2].toLowerCase().replace(/^\w/, char => char.toUpperCase()); translated = `NIVEAU ${levelChallenge[1]} · ${translationLookup.get(difficulty) || levelChallenge[2]}`; }
        const numberedLevelType = key.match(/^LEVEL (\d+) · (LESSON \d+|PRACTICE GAME|UNIT CHECKPOINT|UNIT \d+ FINAL EXAM)$/);
        if (!translated && numberedLevelType) { const kind = numberedLevelType[2]; const kindFr = kind.startsWith('LESSON') ? kind.replace('LESSON','LEÇON') : kind === 'PRACTICE GAME' ? 'JEU D’ENTRAÎNEMENT' : kind === 'UNIT CHECKPOINT' ? 'ÉVALUATION D’UNITÉ' : kind.replace('UNIT','UNITÉ').replace('FINAL EXAM','EXAMEN FINAL'); translated = `NIVEAU ${numberedLevelType[1]} · ${kindFr}`; }
        const levelSummary = key.match(/^Level (\d+) of 100 · (\d+) questions · (\d+)% to pass\.$/);
        if (!translated && levelSummary) translated = `Niveau ${levelSummary[1]} sur 100 · ${levelSummary[2]} questions · ${levelSummary[3]} % pour réussir.`;
        const xpProgress = key.match(/^(\d+) \/ 100 XP to next level$/);
        if (!translated && xpProgress) translated = `${xpProgress[1]} / 100 XP avant le niveau suivant`;
        const success = key.match(/^You got (\d+) of (\d+) right\. (You earned (\d+) XP\.|Review complete—no extra XP this time\.) Keep your momentum going\.$/);
        if (!translated && success) translated = success[3] ? `Vous avez ${success[1]} bonne${success[1] === '1' ? '' : 's'} réponse${success[1] === '1' ? '' : 's'} sur ${success[2]}. Vous avez gagné ${success[3]} XP. Continuez sur votre lancée.` : `Vous avez ${success[1]} bonne${success[1] === '1' ? '' : 's'} réponse${success[1] === '1' ? '' : 's'} sur ${success[2]}. Révision terminée, sans XP supplémentaire. Continuez sur votre lancée.`;
        const retry = key.match(/^You got (\d+) of (\d+) right\. You need (\d+) correct to pass\.$/);
        if (!translated && retry) translated = `Vous avez ${retry[1]} bonne${retry[1] === '1' ? '' : 's'} réponse${retry[1] === '1' ? '' : 's'} sur ${retry[2]}. Il vous en faut ${retry[3]} pour réussir.`;
        const feedback = key.match(/^(That’s right!|Not quite\.) (.+)$/);
        if (!translated && feedback) translated = `${feedback[1] === 'That’s right!' ? 'Bonne réponse !' : 'Pas tout à fait.'} ${translationLookup.get(feedback[2]) || feedback[2]}`;
        const matchingTitle = key.match(/^(.+) concept match$/);
        if (!translated && matchingTitle) translated = `${translationLookup.get(matchingTitle[1]) || matchingTitle[1]} : associer les notions`;
        const checkpointTitle = key.match(/^(.+) checkpoint$/);
        if (!translated && checkpointTitle) translated = `Évaluation de ${translationLookup.get(checkpointTitle[1]) || checkpointTitle[1]}`;
        const examTitle = key.match(/^(.+) level exam$/);
        if (!translated && examTitle) translated = `Examen de niveau : ${translationLookup.get(examTitle[1]) || examTitle[1]}`;
        const lessonQuestion = key.match(/^Which idea best matches “(.+)”\?$/);
        if (!translated && lessonQuestion) translated = `Quelle notion correspond le mieux à « ${translationLookup.get(lessonQuestion[1]) || lessonQuestion[1]} » ?`;
        const negativeOption = key.match(/^Not (.+)$/);
        if (!translated && negativeOption) translated = `Pas ${translationLookup.get(negativeOption[1]) || negativeOption[1]}`;
        const failedResult = key.match(/^You got (\d+) of (\d+) right\. Review the lesson and try again—you need (\d+) correct to pass\.$/);
        if (!translated && failedResult) translated = `Vous avez ${failedResult[1]} bonne${failedResult[1] === '1' ? '' : 's'} réponse${failedResult[1] === '1' ? '' : 's'} sur ${failedResult[2]}. Revoyez la leçon et réessayez : il vous faut ${failedResult[3]} bonne${failedResult[3] === '1' ? '' : 's'} réponse${failedResult[3] === '1' ? '' : 's'} pour réussir.`;
        const gameResult = key.match(/^You matched every concept\. (Review complete—no extra XP this time\.|You earned (\d+) XP\.) Your checkpoint is now unlocked\.$/);
        if (!translated && gameResult) translated = `Vous avez associé toutes les notions. ${gameResult[2] ? `Vous avez gagné ${gameResult[2]} XP.` : 'Révision terminée, sans XP supplémentaire.'} Votre évaluation est maintenant débloquée.`;
        const levelComplete = key.match(/^You passed the (.+) final exam\. Keep going to grow your XP\.$/);
        if (!translated && levelComplete) translated = `Vous avez réussi l’examen final de ${translationLookup.get(levelComplete[1]) || levelComplete[1]}. Continuez pour gagner des XP.`;
      }
      if (translated !== undefined && node.nodeValue !== source.replace(key, translated)) node.nodeValue = source.replace(key, translated);
    }
    const attrMap = { placeholder: attributeTranslations, title: attributeTranslations, 'aria-label': attributeTranslations, content: translationLookup };
    root.querySelectorAll?.('[placeholder],[title],[aria-label],[content]').forEach(element => {
      if (element.id === 'languageToggle') return;
      let originals = originalAttributes.get(element);
      if (!originals) { originals = {}; originalAttributes.set(element, originals); }
      for (const attr of Object.keys(attrMap)) {
        if (!element.hasAttribute(attr)) continue;
        if (!(attr in originals)) originals[attr] = element.getAttribute(attr);
        const original = originals[attr];
        const translated = language === 'fr' ? attrMap[attr][original] : original;
        if (translated !== undefined && element.getAttribute(attr) !== translated) element.setAttribute(attr, translated);
      }
    });
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'fr' ? 'fr' : 'en';
    document.documentElement.dataset.language = next;
    const pageTitles = { 'STC Learnit — Your next level starts here': 'STC Learnit — Votre prochain niveau commence ici', 'Learn & Practice — STC Learnit': 'Apprendre et pratiquer — STC Learnit', 'Leaderboard — STC Learnit': 'Classement — STC Learnit', 'My Profile — STC Learnit': 'Mon profil — STC Learnit' };
    document.title = next === 'fr' ? (pageTitles[originalTitle] || originalTitle) : originalTitle;
    const toggle = document.querySelector('#languageToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', next === 'fr' ? 'Choisir la langue (français)' : 'Choose language (English)');
      toggle.title = next === 'fr' ? 'Choisir la langue' : 'Choose language';
    }
    document.querySelectorAll('[data-language-option]').forEach(option => {
      option.setAttribute('aria-checked', String(option.dataset.languageOption === next));
    });
    localize();
    window.dispatchEvent(new CustomEvent('stc:language-change', { detail: { language: next } }));
  }
  try { language = localStorage.getItem(storageKey) === 'fr' ? 'fr' : 'en'; } catch {}
  setLanguage(language);
  const languageToggle = document.querySelector('#languageToggle');
  const languageMenu = document.querySelector('#languageMenu');
  languageToggle?.addEventListener('click', () => {
    const isOpen = languageToggle.getAttribute('aria-expanded') === 'true';
    languageToggle.setAttribute('aria-expanded', String(!isOpen));
    if (languageMenu) languageMenu.hidden = isOpen;
  });
  document.querySelectorAll('[data-language-option]').forEach(option => {
    option.addEventListener('click', () => {
      const next = option.dataset.languageOption;
      try { localStorage.setItem(storageKey, next); } catch {}
      setLanguage(next);
      if (languageMenu) languageMenu.hidden = true;
      languageToggle?.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.language-picker')) {
      if (languageMenu) languageMenu.hidden = true;
      languageToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && languageMenu && !languageMenu.hidden) {
      languageMenu.hidden = true;
      languageToggle?.setAttribute('aria-expanded', 'false');
      languageToggle?.focus();
    }
  });
  const observer = new MutationObserver(records => {
    if (records.some(record => record.type === 'childList' || record.type === 'characterData')) localize();
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true });
})();
