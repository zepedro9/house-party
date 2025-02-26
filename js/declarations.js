const SPECIAL_EVENT_PROBABILITY = 10;//%
const AFTER_PARTY_PROBABILITY = 25;//%

let timeProgress = -5;
let eventosNaoFixos;
let isAfterParty = false;

class Jogador {
    constructor(nome, isMale) {
        this.nome = nome;
        this.isMale = isMale;
        this.isOwner = false;
    }
}

class Evento {
    constructor(frase, numJogadores, quemMorre, rarity, repeatable) {
        this.frase = frase;
        this.numJogadores = numJogadores;
        this.quemMorre = quemMorre;
        this.rarity = rarity;
        this.repeatable = repeatable;
    }
}

class Evento_Especial {
    constructor(titulo, isFixed) {
        this.titulo = titulo;
        this.isFixed = isFixed;
        this.hourIfFixed = -1;
    }
}

let jogadores = [];

let jogadoresForaDaFesta = [];

let eventos = [];

let eventosInicio = [];

let eventosPolicia = [];

let eventosLuzAbaixo = [];

let eventosExercito = [];

let eventosStrippers = [];

let eventosCelebrities = [];

let eventoAfterParty = [];

let eventosEspeciais = [];

let adicionarJogadores = [
    "Chico<M>", "Pedro Carvalho<M>", "Zé<M>", "Vicente<M>", "Madi<F>", "Balsinha<F>", "Morais<M>", "Sofia<F>", "Vasco Loureiro<M>",  "Couto<M>",
    "Sá<M>", "Bruno<M>", "Pinheiro<M>", "Paula<F>", "Fitas<M>", "Tiago Pinto<M>", "Bia Fonseca<F>", "Fragoso<M>", "Farivi<M>", "Garrett<M>", "Nasha<F>",
    "Mónica<F>", "Cristovão<M>", "Cunha<M>", "Joana Regino<F>"
];

let adicionarEventos = [
    "<r2><jogador> grega no sofá.",
    "<r2><jogador> manda uma litrosa de pénalti.",
    "<r2><jogador> rouba um pacote de bolachas integrais.",
    "<r2><jogador> senta-se no sofá a descansar.",
    "<r3><jogador> tenta fazer um mortal embriagad(1o/a) e parte o pescoço.<x1>",
    "<r2><jogador> começa a chorar e andar pela casa sozinh(1o/a).",
    "<r1><jogador> bebe uma Gutbier fresquinha.",
    "<r2><jogador> liga à mãe para dizer que o estudo está a correr bem.",
    "<r2><jogador> toma controlo da coluna.<nr>",
    "<r2><jogador> vai mijar no jardim porque as casas de banho estão ocupadas.",
    "<r2><jogador> parte uma janela e é expuls(1o/a) da festa.<x1>",
    "<r2><jogador> faz um martini.",
    "<r1><jogador> fuma um pensativo cigarro.",
    "<r1><jogador> assiste atentamente ao jogo de Beer Pong.",
    "<r2><jogador> vai para o jardim apanhar ar.",
    "<r1><jogador> cansou-se e vai embora.<x1>",
    "<r2><jogador> vai a procura de uma presa.",
    "<r3><jogador> tenta seduzir o guarda.",
    "<r2><jogador> bebe 22 shots seguidos e entra em coma alcoolico.<x1>",
    "<r2><jogador> começa a falar sozinh(1o/a).",
    "<r3><jogador> decide começar a correr n(1u/ua) no meio do jardim.",
    "<r3><jogador> tenta fazer um truque de magia, corre mal e vai chorar para a casa de banho.",
    "<r1><jogador> vai embora.<x1>",
    "<r2><jogador> fica a brincar com a cadela.",
    "<r3><jogador> tenta tocar na gata e acaba por sofrer feridas fatais.<x1>",
    "<r1><jogador> começa a cantar.",
    "<r1><jogador> vai dançar.",
    "<r3><jogador> tenta ter relações sexuais com a cadela.<nr>",
    "<r2><jogador> rouba a câmara do Morais e começa a tirar fotografias.<nr>",
    "<r3><jogador> enlouquece, pega numa faca de cortar o pão e corta o cabelo.",
    "<r1><jogador> bebe uma cerveja enquanto vê o jogo de beer pong.",
    "<r2><jogador> está completamente embriagad(1o/a).",
    "<r3><jogador> pega numa vassoura e numa colher, vai para cima da garagem, diz Wingardium Leviosa e atira-se pensando que é (1um/uma) feiticeir(1o/a). Consequentemente parte a coluna vertebral e vai para o hospital.<x1>",
    "<r2><jogador> perde uma aposta e mostra o mamilo esquerdo a várias pessoas.",
    "<r3><jogador> mete One Direction na coluna.<nr>",
    "<r3><jogador> sente-se sozinh(1o/a) e vai jogar Minecraft para a PS4.",
    "<r2><jogador> começa a dançar incontrolavelmente.",
    "<r1><jogador> bebe um copo de vinho tinto.",
    "<r3><jogador> manda uma linha de cocaína.",
    "<r2><jogador> morre de overdose de cocaína.<x1>",
    "<r2><jogador> deita-se no sofá enjoad(1o/a).",
    "<r2><jogador> pede uma sessão fotográfica individual. Que poser do caralho.",
    "<r2><jogador> já não sabe onde está.",
    "<r3><jogador> está a cagar furiosamente na casa de banho.",
    "<r3><jogador> faz, com sucesso, um triplo mortal encarpado e é aplaudid(1o/a) por toda a gente.",
    "<r2><jogador> não para de comer cubos de gelo.",
    "<r2><jogador> está com sono e vai embora.<x1>",
    "<r3><jogador> põe 12 pastilhas de viagra num copo aleatório.",
    "<r3><jogador> bebe uma bebida minada com viagra e fica com um tesão enorme.",
    "<r2><jogador> pede 3 menus de McDonald's pela uber eats.",
    "<r2><jogador> tenta fumar uma cotonete. Claramente está embriagad(1o/a).",
    "<r2><jogador> alcoólatra como é, bebe shots de absinto sozinh(1o/a).",
    "<r3><jogador> perde um jogo e bebe um shot de esperma.",
    "<r2><jogador> abre o frigorífico rapidamente e parte duas garrafas caras do anfitrião. Mete as culpas n(2o/a) <jogador> e est(2e/a) é expuls(2o/a) da festa.<x2>",
    "<r2><jogador> tira um limão do limoeiro e atira à cara d(2o/a) <jogador>.",
    "<r1><jogador> mete conversa com <jogador>.",
    "<r2><jogador> leva grande chapada d(2o/a) <jogador>.",
    "<r2><jogador> e <jogador> começam a dançar sensualmente.",
    "<r2><jogador> faz um gin tónico para <jogador>.",
    "<r2><jogador> e <jogador> vão para o quarto pinar forte e feio.<nr>",
    "<r3><jogador> e <jogador> começam a pinar até entortar.<nr>",
    "<r2><jogador> e <jogador> ganham um jogo de beer pong.<nr>",
    "<r2><jogador> mete um comprimido suspeito na bebida de <jogador>.",
    "<r3><jogador> e <jogador> começam-se a comer agressivamente em cima da mesa de beer pong no decorrer de um jogo.<nr>",
    "<r2><jogador> e <jogador> vão para um dos quartos estudar anatomia em braille.<nr>",
    "<r2><jogador> faz uma lap dance (2ao/á) <jogador>.",
    "<r1><jogador> e <jogador> falam e riem-se juntos enquanto vão buscar bebidas.",
    "<r2><jogador> toca piano para impressionar <jogador>.<nr>",
    "<r2><jogador> e <jogador> vão embora junt(0os/as).<x12>",
    "<r2><jogador> começa a dançar e <jogador> fica hipnotizad(2o/a).",
    "<r1><jogador> dá uma volta á casa para encontrar <jogador>.",
    "<r3><jogador> absolutamente do nada dá uma cabeçada n(2o/a) <jogador> deixando-(2o/a) momentaneamente inconsciente.",
    "<r2><jogador> tenta sacar <jogador> sem sucesso.",
    "<r2><jogador> começa a filmar as figuras tristes d(2o/a) <jogador>.",
    "<r1><jogador> e <jogador> dão um grande abraço.",
    "<r3><jogador> e <jogador> comem um frango inteiro que se apresentava calmo e sossegado no balcão.<nr>",
    "<r2><jogador> numa conversa, afirma que (2o/a) <jogador> é a pessoa mais gostosa da festa.",
    "<r2><jogador> recusa beijar <jogador>.",
    "<r2><jogador> e <jogador> começam á porrada, o guarda vê e expulsa-(0os/as) da festa.<x12>",
    "<r2><jogador> leva <jogador> num passeio a volta da casa.",
    "<r3><jogador> faz um direto no instagram enquanto recebe sexo oral d(2o/a) <jogador>.",
    "<r2><jogador> e <jogador> decidem medir forças num braço de ferro. <j1> ganha facilmente.",
    "<r2><jogador> e <jogador> decidem medir forças num braço de ferro. <j2> ganha facilmente.",
    "<r3><jogador> e <jogador> ficam de tronco nu e começam a acariciar os mamilos ao som de “Cabritinha” - Quim Barreiros.",
    "<r2><jogador> e <jogador> extremamente alcoolizad(0os/as), pensam em criar uma app juntos.",
    "<r2><jogador> e <jogador> formam equipa para o Beer Pong.",
    "<r2><jogador> e <jogador> partilham um beijo romântico.",
    "<r2><jogador> e <jogador> dançam loucamente ao som de techno romeno.",
    "<r2><jogador> tenta convencer <jogador> a fumar erva.",
    "<r2><jogador> tenta levar <jogador> para casa. Não consegue e vai embora sozinh(1o/a).<x1>",
    "<r3><jogador> tem a melhor sessão de sexo oral da sua vida, fornecida pel(2o/a) <jogador>.",
    "<r2><jogador> tenta fugir d(2o/a) <jogador>.",
    "<r2><jogador> arrepende-se de beijar <jogador>.",
    "<r3><jogador> e <jogador> ficam num canto da casa a beber sumo de laranja e a falar do Disney Channel.",
    "<r1><jogador> junta-se a <jogador> e <jogador> e ficam a falar.",
    "<r2><jogador> abre a porta de um dos quartos e vê <jogador> e <jogador> a praticar o coito.",
    "<r1><jogador>, <jogador> e <jogador> fumam um cigarro juntos.",
    "<r2><jogador> e <jogador> tentam embebedar <jogador>.",
    "<r2><jogador>, <jogador> e <jogador> dançam juntos.",
    "<r2><jogador> vê <jogador> e <jogador> a comerem-se e saí da festa a chorar.<x1>",
    "<r2><jogador> faz um twerk gostoso para <jogador> e <jogador>.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber. <j1> ganha.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber. <j2> ganha.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber. <j3> ganha.",
    "<r3><jogador>, <jogador> e <jogador> combinam fazer uma ménage.",
    "<r1><jogador>, <jogador> e <jogador> tiram uma foto junt(0os/as).",
    "<r2><jogador> e <jogador> discutem acerca de quem consegue sacar (3o/a) <jogador>.",
    "<r2><jogador>, <jogador> e <jogador> sobem á garagem e ficam lá a falar.",
    "<r2><jogador> está a falar com <jogador> mas realmente queria estar a falar com (3o/a) <jogador>.",
    "<r1><jogador>, <jogador> e <jogador> bebem shots juntos.",
    "<r3><jogador> sente-se mal e vomita para cima de <jogador> e <jogador>.",
    "<r2><jogador>, <jogador> e <jogador> falam com o guarda.<nr>",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber shots. <j1> ganha pois é (1um/uma) alcoólic(1o/a) de merda.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber shots. <j2> ganha pois é (2um/uma) alcoólic(2o/a) de merda.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de beber shots. <j3> ganha pois é (3um/uma) alcoólic(3o/a) de merda.",
    "<r3><jogador> de olhos vendados, num quarto escuro, recebe uma lap dance de <jogador> e <jogador>.",
    "<r2><jogador> e <jogador> ajudam <jogador> a gregar na casa de banho.",
    "<r2><jogador> regurgita para cima de <jogador> e <jogador>.",
    "<r2><jogador> toca guitarra enquanto <jogador> e <jogador> cantam e bebem.<nr>",
    "<r1><jogador> e <jogador> apanham a boleia de <jogador> e vão todos embora.<x123>",
    "<r2><jogador>, <jogador> e <jogador> discutem.",
    "<r1><jogador>, <jogador>, <jogador> e <jogador> jogam Shot-Roullete.",
    "<r3><jogador>, <jogador>, <jogador> e <jogador> começam á porrada com garrafas partidas e <j1> vai para o hospital com meia Eristoff presa à barriga.<x1>",
    "<r3><jogador>, <jogador>, <jogador> e <jogador> começam á porrada com garrafas partidas e <j2> vai para o hospital com meia Eristoff presa à barriga.<x2>",
    "<r3><jogador>, <jogador>, <jogador> e <jogador> começam á porrada com garrafas partidas e <j3> vai para o hospital com meia Eristoff presa à barriga.<x3>",
    "<r3><jogador>, <jogador>, <jogador> e <jogador> começam á porrada com garrafas partidas e <j4> vai para o hospital com meia Eristoff presa à barriga.<x4>",
    "<r2><jogador> mostra os seus dotes de malabarismo a <jogador>, <jogador> e <jogador>.",
    "<r2><jogador> e <jogador> começam uma batalha de dança com <jogador> e <jogador>.",
    "<r3><jogador>, <jogador>, <jogador> e <jogador> falam da situação política do paraguai enquanto bebem whiskey cola.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> fumam um porro do Cristovão.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> vão à casa de banho juntos.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> fazem um brinde com champagne.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> jogam futebol no jardim.",
    "<r2><jogador>, <jogador>, <jogador>, <jogador> e <jogador> começam um jogo de picollo caliente.",
    "<r2><jogador>, <jogador>, <jogador>, <jogador> e <jogador> começam a jogar o jogo da moeda.",
    "<r3><jogador>, <jogador>, <jogador>, <jogador> e <jogador> partilham um bom canhão de erva de 33 centímetros.",
    "<r3><jogador> tenta meter a gata na panela e fazer um guisado felino.",
    "<r3><jogador> diz que estas festas são más e é imediatamente teletransportado para a puta que (1o/a) pariu.<x1>",
    "<r3><jogador> foi comprar gelo á bomba de gasolina e foi raptad(1o/a) por 15 ciganos.<x1>",
    "<r2><jogador> revela traços de homosexualidade.",
    "<r2><jogador> lança a bola vencedora do jogo de beer pong.<nr>",
    "<r3><jogador> vai embora porque se lembrou que tem uma aula de pilates na manhã seguinte.<x1>",
    "<r3><jogador> rebenta a torneira da casa de banho.<nr>",
    "<r2><jogador> aquece um mojito no forno.",
    "<r3><jogador> diz ás pessoas que é bonit(1o/a) e é imediatamente levad(1o/a) para o manicômio.<x1>",
    "<r2><jogador> e <jogador> estão numa streak de wins no Beer Pong.",
    "<r3><jogador> drogou e violou <jogador>.",
    "<r2><jogador> usa o seu charme imenso para seduzir <jogador>.",
    "<r2><jogador> entra em coma alcoólico e <jogador> acompanha-(1o/a) ao hospital.<x12>",
    "<r2><jogador> bebe um body shot no corpo de <jogador>.",
    "<r2><jogador> e <jogador> tentam embebedar a cadela.",
    "<r2><jogador> e <jogador> num jogo de picollo admitem que já se comeram no passado.",
    "<r2><jogador> peida-se agressivamente e culpa <jogador>.",
    "<r2><jogador> e <jogador> saem da festa para ir a uma discoteca.<x12>",
    "<r3><jogador> e <jogador> saem da festa para ir às putas da Antunes de Guimarães.<x12>",
    "<r2><jogador> foi tentar falar com <jogador> que estava sozinh(2o/a) mas não teve coragem e voltou para trás.",
    "<r2><jogador> e <jogador> começam-se a comer.",
    "<r3><jogador>, <jogador> e <jogador> participam numa ménage quente.",
    "<r2><jogador> mete música sensual para incentivar <jogador> e <jogador> a comerem-se.",
    "<r2><jogador>, <jogador> e <jogador> ligam a mangueira e tomam um banho.",
    "<r3><jogador>, <jogador> e <jogador> vão comprar bebidas de carro e sofrem um acidente grave.<x123>",
    "<r2><jogador>, <jogador> e <jogador> discutem.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> jogam futebol no jardim.",
    "<r2><jogador>, <jogador>, <jogador>, <jogador> e <jogador> jogam pirâmide.",
    "<r2><jogador> e <jogador> falam mal d(3o/a) <jogador>.",
    "<r2><jogador> não consegue parar de olhar para o cu d(2o/a) <jogador>.",
    "<r3><jogador> e <jogador> começam à porrada por causa d(3o/a) <jogador>.",
    "<r2><jogador> quer comer (2o/a) <jogador> mas não admite.",
    "<r2><jogador> fica a pensar na vida enquanto bebe uma caipirinha.",
    "<r2><jogador> está triste.",
    "<r2><jogador> está frustrad(1o/a) porque (2o/a) <jogador> não lhe dá atenção.",
    "<r2><jogador> arma-se em dj e mete música de merda.",
    "<r2><jogador> pega numa banana e mostra como se faz um broche requintado.",
    "<r3><jogador> encontra um Mewtwo na cozinha enquanto joga Pokemon Go e tenta desesperadamente apanha-lo.",
    "<r2><jogador> pega numa esfregona e começa a dançar o Esfrega Esfrega.<nr>",
    "<r2><jogador> recebe nudes marotas d(2o/a) <jogador> e manda para os amigos.",
    "<r2><jogador> é rejeitad(1o/a) pel(2o/a) <jogador>.",
    "<r3><jogador> abre uma garrafa de champagne e dispara a rolha, sem querer, contra <jogador>, cegando-lhe do olho esquerdo. Est(2e/a) vai para o hospital.<x2>",
    "<r3><jogador> e <jogador> fodem e <j1> fica extremamente desapontad(1o/a).",
    "<r2><jogador> e <jogador> beijam-se. <j2> fica arrependid(2o/a) e vai embora da festa.<x2>",
    "<r3><jogador> e <jogador> dão uma volta pela casa para mostrarem que andam a treinar os glúteos no ginásio.",
    "<r2><jogador> e <jogador> bebem whiskey gelado enquanto falam de negócios.",
    "<r1><jogador>, <jogador> e <jogador> riem-se juntos.",
    "<r2><jogador>, <jogador> e <jogador> perguntam às pessoas quem é mais gat(0o/a). <j3> ganha.",
    "<r2><jogador> faz umas misturas potentes para (2o/a) <jogador> e (3o/a) <jogador>.",
    "<r2><jogador> dá uma chapada no cu d(2o/a) <jogador>, acusando depois <jogador> de a ter dado, e <j3> recebe uma bofetada estrondosa de <j2>.",
    "<r3><jogador>, <jogador> e <jogador> bebem e ouvem os gemidos d(4o/a) <jogador> e d(5o/a) <jogador> vindos do quarto ao lado.",
    "<r2><jogador> chama um uber para (2o/a) <jogador> ir embora.<x2>",
    "<r2><jogador> recebe uma chamada da mãe obrigando-(1o/a) a ir de imediato para casa.<x1>",
    "<r1><jogador> chama um uber para (2o/a) <jogador> ir embora.<x2>",
    "<r2><jogador> recebe uma chamada da mãe obrigando-(1o/a) a ir de imediato para casa.<x1>",
    "<r2><jogador> mijou no lavatório da cozinha e foi expulso da festa.<x1>",
    "<r1><jogador> e <jogador> perderam no beer-pong, amuaram e foram embora.<x12>",
    "<r2><jogador> e <jogador> arrombaram, roubaram o carro da mãe do anfitrião e bazaram.<x12>",
    "<r2><jogador> vai para casa tod(1o/a) rebentad(1o/a) depois de uma sessão de fornicação hardcore com (2o/a) <jogador>.<x1>",
    "<r2><jogador> senta-se enquanto explora umas putas no instagram.",
    "<r2><jogador> mama forte e feio um Licor Beirão.",
    "<r2><jogador>, <jogador> e <jogador> fazem um Wet T-shirt Contest. <j1> ganha facilmente.",
    "<r1><jogador> e <jogador> discutem sobre gostos musicais.",
    "<r3><jogador> faz questão de adicionar <jogador> no MySpace.",
    "<r2><jogador> não quer beber mais, e oferece a sua bebida (2ao/á) <jogador>.",
    "<r3><jogador> grega na própria bebida e tenta fingir que nada se passou.",
    "<r3><jogador> saca do portátil e começa a mostrar a sua personagem no League of Legends (2ao/à) <jogador>.",
    "<r1><jogador> começa a tirar uma clássica story para o insta e <jogador>, <jogador> e <jogador> juntam-se.",
    "<r2><jogador>, <jogador>, <jogador>, <jogador> e <jogador> começam a cantar o hino nacional.",
    "<r2><jogador> pega num pêssego e começa a demonstrar como é que se mete dedos à DJ marroquino.",
    "<r2><jogador> mostra o piercing que tem no mamilo, (2ao/á) <jogador>.",
    "<r2><jogador>, <jogador> e <jogador> bebem poncha madeirense de pênalti. <j1> não aguenta e cai ao chão em coma alcoólico.<x1>",
    "<r2><jogador> é rejeitad(1o/a) pel(2o/a) <jogador>, <jogador> e <jogador>. Sem vergonha, decide comer a sua última opção na festa, <jogador>.",
    "<r3><jogador> sai do quarto com <jogador> após a melhor sessão de fornicação das suas vidas.",
    "<r2><jogador> começa a uivar.",
    "<r2><jogador> é demasiada areia para o camião d(2o/a) <jogador> por isso voltou para a beira dos amigos.",
    "<r2><jogador>, mestre da alcoolemia, ensina <jogador> e <jogador> a beberem que nem camelos.",
    "<r1><jogador> e <jogador> trocam olhares sedutores.",
    "<r2><jogador> ganha coragem para ir falar com a sua crush, <jogador>, e vai tentar a sorte.",
    "<r2><jogador> manda uma pastilha de ecstasy.",
    "<r2><jogador> pega na bíblia e começa a ler versículos em voz alta.",
    "<r3><jogador> arma-se em papa, abre uma janela do andar de cima e começa a acenar para os discípulos enquanto mama duas Gutbiers.",
    "<r2><jogador> não para de falar.",
    "<r3><jogador> e <jogador> já beberam 60% do stock de bebidas da festa.<nr>",
    "<r1><jogador> fuma um cigarro enquanto <jogador> lhe fala da vida.",
    "<r2><jogador> e <jogador> estão a falar da quantidade enorme de pessoas que (3o/a) já comeu.",
    "<r2><jogador> e <jogador> estão a curtir de se conhecerem melhor.",
    "<r2><jogador> e <jogador> começam uma porrada amigável para ver quem ganha. <j1> ganha com dificuldade.",
    "<r2><jogador> come um limão com casca.",
    "<r3><jogador> está demasiado bêbad(1o/a) e tropeça num pedaço de oxigénio.",
    "<r2><jogador> e <jogador> dão as mãos sem que (3o/a) <jogador> veja.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> juntam-se num grupo e jogam ao Soldadinho.",
    "<r1><jogador> enrola um cigarro.",
    "<r1><jogador> tenta cravar um cigarro.",
    "<r2><jogador> ajuda <jogador> a fugir d(3o/a) <jogador>.",
    "<r3><jogador> não faz absolutamente nada, é um pãozinho sem sal do caralho.",
    "<r2><jogador> dança com <jogador> para irritar (3o/a) <jogador>.",
    "<r2><jogador> está insegur(1o/a) quanto à sua altura.",
    "<r2><jogador> sente que está a exagerar no álcool e chama um uber para casa.<x1>",
    "<r3><jogador>, <jogador> e <jogador> fecham-se na sala de cima, acendem charutos cubanos, bebem um whiskey irlandês de 1857 e falam de negócios multimilionários.",
    "<r2><jogador> lembrou-se que é coninhas e foi embora para casa.<x1>",
    "<r2><jogador> e <jogador> começam a avaliar (3o/a) <jogador>. Concordam em dar-lhe um 3 em 10.",
    "<r2><jogador> e <jogador> avaliam (3o/a) <jogador>. Concordam em dar-lhe um 10 em 10.",
    "<r1><jogador> e <jogador> estão sozinhos e começam a falar.",
    "<r3><jogador> tenta roubar uma garrafa cara do anfitrião e é instantaneamente evaporizado e transformado em cinzas.<x1>",
    "<r2><jogador> elogia (2o/a) <jogador>.",
    "<r3><jogador> não para de falar de si própri(1o/a). Pavão de merda.",
    "<r3><jogador> tem uma bad trip enquanto fumava um porro com (2o/a) <jogador> e (3o/a) <jogador>, e vai para o hospital.<x1>",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> jogam Eu Nunca.",
    "<r2><jogador> junta-se à talk privada entre <jogador> e <jogador> e tenta incluir-se na conversa.",
    "<r2><jogador> acabou de ser lançad(1o/a) para a friendzone pel(2o/a) <jogador>.",
    "<r2><jogador> derrete-se com os olhares sedutores d(2o/a) <jogador>.",
    "<r3><jogador> e <jogador> não resistiram u(0m/ma) (0ao/a) outr(0o/a) e foram para o quarto partir a cama.",
    "<r2><jogador> não gosta dos olhares que (2o/a) <jogador> e (3o/a) <jogador> estão a trocar.",
    "<r2><jogador> conta segredos d(2o/a) <jogador> (3ao/á) <jogador>.",
    "<r2><jogador> está prestes a atacar <jogador>, mas <jogador> protege-(2o/a).",
    "<r3><jogador> apaga um cigarro na testa d(o/a) <jogador> que de momento se encontra inconsciente devido 5 shots de absinto misturados com yogurt.",
    "<r2><jogador>, <jogador> e <jogador> fumam ganza juntos.",
    "<r3><jogador> sem mais cigarros, e deseperad(1o/a) tenta fumar folhas de limoeiro enroladas em papel higiénico.",
    "<r2><jogador> pode morrer feliz. Finalmente conseguiu sacar (2o/a) <jogador>.",
];

let adicionarEventosInicio = [
    "<r1><jogador> chegou á festa.",
    "<r3><jogador> foi barrad(1o/a) pelo segurança.<x1>",
    "<r3><jogador> chegou de trotinete elétrica.",
    "<r2><jogador> chegou com uma grade de cerveja.",
    "<r3><jogador> veio mesmo não sendo convidad(1o/a).",
    "<r2><jogador> chegou com uma vontade de foder enorme.",
    "<r2><jogador> chegou e trouxe uma Grey Goose.",
    "<r1><jogador> chegou com um saco do minipreço com bebida.",
    "<r3><jogador> chegou e trouxe um camião com 330 litros de Super Bock.",
    "<r2><jogador> chegou e trouxe Gutbiers.",
    "<r3><jogador> chegou vestid(1o/a) de Power Ranger.",
    "<r3><jogador> trouxe um gin para tentar sacar o anfitrião.<nr>",
    "<r2><jogador> chegou e trouxe cerveja, tequilla e duas postas de salmão.",
    "<r1><jogador> chegou com uma mini.",
    "<r3><jogador> decidiu não ir a festa.<x1>",
    "<r2><jogador> chegou com uma vontade de cagar enorme.",
    "<r2><jogador> chegou a achar-se (1o/a) melhor da terra del(1e/a).",
    "<r2><jogador> trouxe uma garrafa de água.",
    "<r3><jogador> e <jogador> chegaram com um carrinho do continente cheio de bebida.",
    "<r1><jogador> e <jogador> chegaram à festa junt(0os/as).",
    "<r2><jogador> e <jogador> chegaram com 25 litros de vinho.",
    "<r1><jogador> e <jogador> chegaram com sangria.",
    "<r2><jogador> e <jogador> chegaram carregad(0os/as) de bebida.",
    "<r3><jogador> e <jogador> chegaram pedrad(0os/as).",
    "<r2><jogador> e <jogador> chegaram com uma garrafa de whiskey.",
    "<r3><jogador> e <jogador> chegaram com um licor asiático de 90% de alcool.",
    "<r3><jogador>, <jogador> e <jogador> chegaram de limousine.",
    "<r3><jogador>, <jogador> e <jogador> chegaram chatead(0os/as) (0uns/mas) com (0os/as) outr(0os/as).",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> chegaram à festa juntos.",
    "<r2><jogador> chega à festa entusiasmad(1o/a).",
    "<r3><jogador> ao entrar na festa deixa cair as garrafas que trazia.",
    "<r3><jogador> chegou num monociclo.",
    "<r2><jogador> e <jogador> chegam com esperanças de apanharem uma puta descomunal.",
    "<r1><jogador>, <jogador> e <jogador> chegam de uber.",
    "<r2><jogador> veio num bad mood.",
    "<r3><jogador> e <jogador> chegaram à festa com um barril de vinho do século XVI.",
    "<r3><jogador> apareceu com uma caixa de charutos cubanos.",
    "<r2><jogador> (1chegou com vontade de sacar umas putas/chegou com vontade de chupar uns pirolitos).",
    "<r2><jogador> chegou e trouxe uma atitude de merda.",
    "<r2><jogador> e <jogador> chegaram junt(0os/as) e chei(0os/as) de estilo.",
    "<r2><jogador>, <jogador> e <jogador> encontraram-se na porta e entraram juntos.",
    "<r2><jogador> chegou com um vinho barato e muito mal vestid(1o/a).",
    "<r3><jogador> e <jogador> chegaram de canoa.",
    "<r3><jogador> veio às cavalitas d(2o/a) <jogador> porque é uma princesa do caralho.",
    "<r3><jogador> chegou com 12 litros de Vodka.",
    "<r2><jogador> juntou-se a <jogador> ao entrada só para fazer inveja (3ao/á) <jogador>.",
    "<r3><jogador> trouxe o que aparentam ser pacotes de farinha para cozinhar aspirinas e plantas medicinais.",
    "<r3><jogador> chegou, pensando que era uma Toga party.",
    "<r2><jogador> e <jogador> vieram juntos com um bom conjunto de bebidas."
];

let adicionarEventosPolicia = [
    "<r1><jogador> age normalmente.",
    "<r2><jogador> esconde-se na dispensa chei(1o/a) de medo.",
    "<r3><jogador> esconde a droga toda, foge pelo muro de trás e vai embora.<x1>",
    "<r2><jogador> permanece extremamente embriagad(1o/a).",
    "<r3><jogador> fica assustad(1o/a) porque não tem o BI para provar que não é uma criança de 14 anos.",
    "<r3><jogador> é imediatamente pres(1o/a).<x1>",
    "<r3><jogador> tem um ataque de raiva, espeta um soco num polícia, sendo imediatamente placado e algemado<x1>",
    "<r1><jogador> e <jogador> vão à janela ver o que acontece.",
    "<r3><jogador> e <jogador> perguntam aos policias se não querem vir mandar uma linha de cocaína com el(0es/as) e são imediatamente pres(0os/as).<nr><x12>",
    "<r2><jogador> e <jogador> gritam \"Que se foda a bófia\".",
    "<r1><jogador>, <jogador> e <jogador> vão á porta falar com a polícia.<nr>",
    "<r1><jogador>, <jogador> e <jogador> cantam e dançam sem preocupações.",
    "<r1><jogador>, <jogador> e <jogador> cagam no assunto e continuam a fumar um cigarrinho.",
    "<r1><jogador>, <jogador> e <jogador> permanecem calm(0os/as).",
    "<r1><jogador>, <jogador>, <jogador> e <jogador> continuam tranquilamente a beber e a falar.",
    "<r2><jogador> finge que está normal mas na verdade acabou de se cagar tod(1o/a).",
    "<r3><jogador>, sendo ninfomaníac(1o/a), começa logo a pensar em levar com as cassetetes peludas dos policiais.",
    "<r2><jogador>, assustad(1o/a), consome a droga que tinha e é levad(1o/a) para o hospital de overdose.<x1>"

];

let adicionarEventosLuzAbaixo = [
    "<r1><jogador> age normalmente.",
    "<r3><jogador> que estava a descer as escadas, não vê onde mete o pé, tropeça e bate com a cabeça, sofrendo um traumatismo craniano. Vai para o hospital.<x1>",
    "<r2><jogador> acende o isqueiro para iluminar.",
    "<r3><jogador> liga à EDP a exigir luz de volta.",
    "<r2><jogador> aproveita para roubar comida.",
    "<r2><jogador> grita.",
    "<r3><jogador> esconde-se na casa de banho.",
    "<r3><jogador> e <jogador> aproveitam e comem-se.",
    "<r2><jogador> fica com medo do escuro e abraça (2o/a) <jogador>.",
    "<r2><jogador> aproveita e põe uma pastilha suspeita no copo d(2o/a) <jogador>.",
    "<r3><jogador> aproveita o momento para mandar um calhau pontiagudo contra <jogador>, (2o/a) qual vai embora de ambulância.",
    "<r2><jogador> e <jogador> pensam que estão numa rave fodida e começam a dançar tipo hippies.",
    "<r1><jogador>, <jogador> e <jogador> acendem a lanterna dos telemóveis para ver.",
    "<r3><jogador>, <jogador> e <jogador> tentam resolver o problema no quadro elétrico.",
    "<r2><jogador> apalpa o cu d(2o/a) <jogador> e desaparece na escuridão.",
    "<r3><jogador> e <jogador> incendeiam o cabelo d(3o/a) <jogador> para iluminar a sala.",
    "<r2><jogador>, <jogador>, <jogador> e <jogador> como crianças que são, jogam ao quarto escuro enquanto se riem histericamente.",
    "<r1><jogador>, <jogador> e <jogador> dirigem-se para o jardim e esperam que a situação se resolva.",
    "<r2><jogador>, no meio da escuridão, tenta beijar (2o/a) <jogador>, engana-se e, em vez disso, beija (3o/a)<jogador>.",
    "<r3><jogador> rouba as carteiras d(2o/a) <jogador> e d(3o/a) <jogador> e desaparece na escuridão sem nunca mais ser vist(1o/a).<x1>",
    "<r2><jogador> continua a beber o seu rum cola tranquilamente.",
    "<r1><jogador> não vê um caralho á frente.",
    "<r2><jogador> entorna um vinho em cima d(2o/a) <jogador>.",
    "<r3><jogador> estava a pinar com (2o/a) <jogador> e quando a luz se foi abaixo (1meteu no buraco errado/aproveitou e fugiu do quarto).",
    "<r3><jogador> tod(1o/a) drogad(1o/a) pensa que são horas de ir embora e sai da festa.<x1>",
    "<r2><jogador> aproveita para se peidar tod(1o/a).",
    "<r2><jogador> bebe o seu Bourbon, num canto da casa.",
    "<r2><jogador> começa a afirmar que a culpa é dos Comunistas."
];

let adicionarEventosExercito = [
    "<r2><jogador> tem um ataque cardíaco.<x1>",
    "<r3><jogador> é balead(1o/a) 420 vezes por ser (1um/uma) terrorista internacional.<x1>",
    "<r1><jogador>, <jogador>, <jogador> e <jogador> deitam-se no chão com as mãos atrás das costas.",
    "<r2><jogador> e <jogador> são imediatamente presos por consumo de substâncias ilícitas.<x12>",
    "<r2><jogador> pensa que os militares são strippers e começa a mandar-lhes notas. É de seguida espancad(1o/a) por cinco macacos das forças armadas.",
    "<r2><jogador> demonstra o seu lado islâmico, grita \"Allahu Akbar\" e peida-se agressivamente. É mort(1o/a) com um tiro de sniper certeiro.<x1>",
    "<r1><jogador> literalmente caga-se tod(1o/a).",
    "<r1><jogador> e <jogador> ficam paralisados.",
    "<r2><jogador> tira a música.<nr>",
    "<r2><jogador> e <jogador> são presos por desobediência.<x12>",
    "<r2><jogador> e <jogador> não se apercebem do acontecimento e continuam a comer-se.",
    "<r3><jogador> com um olhar matador e gestos sedutores consegue trancar dois militares num quarto e praticar bdsm com os dois.",
    "<r1><jogador>, <jogador>, <jogador> e <jogador> fazem exatamente o que os militares dizem.",
    "<r2><jogador> é ignorad(1o/a) pelos oficiais por pensarem que é autista.",
    "<r2><jogador>, <jogador> e <jogador> permanecem encostad(0os/as) a parede como indicad(0os/as).",
    "<r1><jogador> sem qualquer justificação ou dúvida moral, leva com um balázio de uma Glock nas trombas.<x1>",
    "<r3><jogador> com um martini rançoso numa mão e uma nerf noutra, insiste que é o 007. É calad(1o/a) imediatamente.",
    "<r2><jogador> e <jogador> tiram uma selfie do acontecimento para terem buéda likes e visualizações. Superficiais do caralho.",
    "<r2><jogador>, <jogador> e <jogador> apavorad(0os/as), tentam perguntar o que se passa.",
    "<r2><jogador> tranca-se na casa de banho.",
    "<r2><jogador> é pres(1o/a) por ser considerad(1o/a) uma pessoa altamente perigosa.<x1>",
    "<r2><jogador> é pres(1o/a) por roubar demasiados corações.<x1>",
    "<r2><jogador> lembra-se dos velhos tempos no Vietnam, atira-se contra uma janela, decapita um militar com um caco de vidro e vai embora a correr e a gritar.<x1>",
    "<r1><jogador> está extremamente confus(1o/a).",
    "<r2><jogador> (1baixa as calças, tira os boxers, faz um helicopter-dick e voa dali para fora/levanta o top e o sutiã, mostra um belo par de tetas, distrai os guardas e foge).<x1>",
    "<r2><jogador> e <jogador> camuflam-se no meio das árvores do jardim.",
    "<r2><jogador> é pres(1o/a) por ser imigrante ilegal, traficante de narcóticos, vendedo(1r/ra) de orgãos no mercado negro, inimig(1o/a) do estado e portado(1r/ra) de códigos nucleares.<x1>",
    "<r1><jogador> grita desesperadamente.",
    "<r1><jogador> tenta manter a calma enquanto acaba a sua cerveja.",
    "<r2><jogador> emborrachad(1o/a) liga para a polícia a dizer que está a ser assaltad(1o/a).",
    "<r2><jogador> leva um tiro, mas <jogador> mete-se a frente, salvando-(1o/a).<x2>",
    "<r2><jogador>, sem saber o que fazer, mete todas as suas pastilhas num copo aleatório para as esconder, acabando por matar de overdose, <jogador> que de seguida bebeu do copo.<x2>"
];

let adicionarEventosStrippers = [
    "<r2><jogador> vem-se imediatamente.",
    "<r3><jogador> paga 350 euros para ter uma sessão premium num dos quartos.",
    "<r1><jogador> e <jogador> sentam-se no sofá e recebem lap dances.",
    "<r3><jogador> sendo uma pessoa extremamente católica, recusa-se a participar nestas práticas pecadoras e vai embora.<x1>",
    "<r2><jogador> e <jogador> continuam a falar como se nada tivesse acontecido.",
    "<r2><jogador> fica chocad(1o/a).",
    "<r2><jogador> (1ficou todo teso e tenta esconder com uma camisola/fica tão excitada que começa a espumar-se).",
    "<r2><jogador> não pára de imaginar (2o/a) <jogador> numa tanguinha leopardo.",
    "<r2><jogador> entrou em êxtase místico.",
    "<r3><jogador> manda uma linha de cocaína nos glúteos de uma stripper.",
    "<r2><jogador> não curte que (2o/a) <jogador> se esteja a divertir tanto.",
    "<r3><jogador>, <jogador> e <jogador> (0estão na sala do andar de cima com 5 strippers gostosas, notas em cima da mesa, gins tónicos na mão e a fumar charutos cubanos/tiram a roupa, ficam de roupa interior, e juntam-se às strippers).",
    "<r2><jogador> e <jogador> dançam junt(0os/as) completamente ceg(0os/as).",
    "<r3><jogador> pede uma dança privada com um stripper anão.",
    "<r2><jogador> (1não aguentou e foi bater uma punheta para a casa de banho/mostra como é que se mexe a bunda à stripper).",
    "<r2><jogador> e <jogador> fumam um cigarro e emborcam um Moet-Chandon Premium sozinh(0os/as).",
    "<r2><jogador> está a afogar-se em tetas.",
    "<r2><jogador> faz um motorboat (1a/ao) <jogador>.",
    "<r2><jogador> delicia-se com o tamanho do cacetão do stripper preto.",
    "<r2><jogador> aproveita uma dança com uma ladyboy.",
    "<r3><jogador> (1embriagado, pina com uma stripper com um pénis maior que ele/embriagada recebe uma lap dance privada do chulo, um velho peludo de 74 anos).",
    "<r1><jogador>, <jogador> e <jogador> divertem-se, gritam e bebem as suas bebidas com entusiasmo.",
    "<r3><jogador> aproveita a ocasião, leva (2o/a) <jogador> para um quarto e faz uma lap dance com um final feliz.",
    "<r2><jogador> (1tenta sacar uma stripper/sente-se com baixa auto-estima e começa a pensar em meter mamas plásticas).",
    "<r1><jogador>, <jogador>, <jogador> e <jogador> continuam a jogar beer pong.",
    "<r2><jogador>, <jogador> e <jogador> fazem uma competição de lap dances sensuais (4ao/à) <jogador>. <j2> ganha sem qualquer dúvida.",
    "<r3><jogador> come sushi das mamas de uma stripper.",
    "<r1><jogador> e <jogador> falam enquanto vêem uma pole dance.",
    "<r2><jogador> conta os trocos que tem na carteira para tentar pagar uma lap dance.",
    "<r3><jogador> oferece uma dança privada (2ao/á) <jogador> para el(2e/a) se divertir.",
    "<r2><jogador> está a ter a melhor noite da sua vida.",
    "<r1><jogador>, <jogador> e <jogador> assistem a um show de strip.",
    "<r2><jogador> e <jogador> não apreciam esta surpresa e continuam a falar do quão coninhas são.",
    "<r2><jogador> vê <jogador> a pagar uma dança premium, começa a chorar e vai embora.<x1>",
    "<r3><jogador> tenta concretizar o seu sonho de chupar a pixa de um stripper latino, sem sucesso.",
    "<r2><jogador>, mesmo a pagar extra, é recusad(1o/a) pelas strippers.",
    "<r3><jogador> tira uma foto á Dan Bilzerian.",
    "<r2><jogador> e <jogador> bebem um penálti de Malibu para verem quem é que recebe uma lap dance d(3o/a) <jogador>. <j2> Ganha.",
    "<r2><jogador> é infiel e fode com uma stripper.",
    "<r2><jogador> toma controlo da coluna e arma-se em Avicci.<nr>",
    "<r3><jogador> (1lambe chantilly das tetas de uma stripper sueca/lambe chantilly do pincel de um stripper e acaba a fazer um broche).",
    "<r2><jogador> começa a pensar que tinha jeito para ser stripper.",
    "<r2><jogador> e <jogador> sem interesse pelas danças, ficam sozinhos a falar e acabam por se comer romanticamente."
];

let adicionarEventosCelebrities = [

];

let adicionarEventoAfterParty = [
    "<r3><jogador>, <jogador>, <jogador>, <jogador>, <jogador> e <jogador> voltam para a after party!"
];

let adicionarEventosEspeciais = [
    "Início da Festa<H23:00>",
    "Polícia toca à campainha!<>",
    "A luz vai abaixo!<>",
    "Exército arromba as portas<>",
    //"Várias Celebridades Internacionais aparecem na festa!<>",
    "Uma camioneta cheia de strippers chega à festa!<>",
    "After Party<H08:00>"
];