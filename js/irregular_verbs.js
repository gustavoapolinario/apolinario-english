"use strict";
var IrregularVerbs = (function(){

	/* Private Functions */
	const _shuffleVerbs = function(a) {
		for (let i = a.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[a[i - 1], a[j]] = [a[j], a[i - 1]];
		}
	}

	const _calculatePoints = function(test_answers) {

		if( this.in_game ) {
			if( this.is_validating_past ) {
				this.points.correct += test_answers.past ? 1 : 0;
				this.points.wrong += test_answers.past ? 0 : 1;
			}
			if( this.is_validating_past_participle ) {
				this.points.correct += test_answers.past_participle ? 1 : 0;
				this.points.wrong += test_answers.past_participle ? 0 : 1;
			}

			var all_right = ( !this.is_validating_past || test_answers.past ) && 
							( !this.is_validating_past_participle || test_answers.past_participle );

			if( all_right ) {
				this.points.consective++;

				if( this.points.consective > this.points.max_consective ) {
					this.points.max_consective = this.points.consective;
				}
			}
			else {
				this.points.consective = 0;
			}

		}
		
		this.in_game = false;
	}

	const _setVerbs = function() {
		this.verbs = [
			{ infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar'},
			{ infinitive: 'to beat', past: 'beat', past_participle: 'beat', translate: 'bater'},
			{ infinitive: 'to become', past: 'became', past_participle:'become', translate: 'tornar-se'},
			{ infinitive: 'to begin', past: 'began', past_participle:'begun', translate: 'começar'},
			{ infinitive: 'to bend', past: 'bent', past_participle:'bent', translate: 'dobrar'},
			{ infinitive: 'to bet', past: 'bet', past_participle:'bet', translate: 'apostar'},
			{ infinitive: 'to bite', past: 'bit', past_participle:'bit', translate: 'morder'},
			{ infinitive: 'to blow', past: 'blew', past_participle:'blown', translate: 'soprar'},
			{ infinitive: 'to break', past: 'broke', past_participle:'broken', translate: 'quebrar'},
			{ infinitive: 'to bring', past: 'brought', past_participle:'brought', translate: 'trazer'},
			{ infinitive: 'to build', past: 'built', past_participle:'built', translate: 'construir'},
			{ infinitive: 'to buy', past: 'bought', past_participle:'bought', translate: 'comprar'},
			{ infinitive: 'to catch', past: 'caught', past_participle:'caught', translate: 'pegar'},
			{ infinitive: 'to choose', past: 'chose', past_participle:'chosen', translate: 'escolher'},
			{ infinitive: 'to come', past: 'came', past_participle:'come', translate: 'vir'},
			{ infinitive: 'to cost', past: 'cost', past_participle:'cost', translate: 'custar'},
			{ infinitive: 'to cut', past: 'cut', past_participle:'cut', translate: 'cortar'},
			{ infinitive: 'to deal', past: 'dealt', past_participle:'dealt', translate: 'lidar com'},
			{ infinitive: 'to dig', past: 'dug', past_participle:'dug', translate: 'cavar'},
			{ infinitive: 'to do', past: 'did', past_participle:'done', translate: 'fazer'},
			{ infinitive: 'to draw', past: 'drew', past_participle:'drawn', translate: 'desenhar'},
			{ infinitive: 'to drink', past: 'drank', past_participle:'drunk', translate: 'beber'},
			{ infinitive: 'to drive', past: 'drove', past_participle:'driven', translate: 'dirigir'},
			{ infinitive: 'to eat', past: 'ate', past_participle:'eaten', translate: 'comer'},
			{ infinitive: 'to fall', past: 'fell', past_participle:'fallen', translate: 'cair'},
			{ infinitive: 'to feed', past: 'fed', past_participle:'fed', translate: 'alimentar'},
			{ infinitive: 'to feel', past: 'felt', past_participle:'felt', translate: 'sentir'},
			{ infinitive: 'to fight', past: 'fought', past_participle:'fought', translate: 'lutar'},
			{ infinitive: 'to find', past: 'found', past_participle:'found', translate: 'achar'},
			{ infinitive: 'to fit', past: 'fit', past_participle:'fit', translate: 'servir'},
			{ infinitive: 'to forget', past: 'forgot', past_participle:'forgotten', translate: 'esquecer'},
			{ infinitive: 'to fly', past: 'flew', past_participle:'flown', translate: 'voar'},
			{ infinitive: 'to freeze', past: 'froze', past_participle:'frozen', translate: 'congelar'},
			{ infinitive: 'to get', past: 'got', past_participle:'gotten', translate: 'pegar'},
			{ infinitive: 'to give', past: 'gave', past_participle:'given', translate: 'dar'},
			{ infinitive: 'to go', past: 'went', past_participle:'gone', translate: 'ir'},
			{ infinitive: 'to grow', past: 'grew', past_participle:'grown', translate: 'crescer'},
			{ infinitive: 'to have', past: 'had', past_participle:'had', translate: 'ter'},
			{ infinitive: 'to hear', past: 'heard', past_participle:'heard', translate: 'escutar'},
			{ infinitive: 'to hide', past: 'hid', past_participle:'hidden', translate: 'esconder'},
			{ infinitive: 'to hold', past: 'held', past_participle:'held', translate: 'segurar'},
			{ infinitive: 'to hurt', past: 'hurt', past_participle:'hurt', translate: 'machucar'},
			{ infinitive: 'to keep', past: 'kept', past_participle:'kept', translate: 'manter'},
			{ infinitive: 'to know', past: 'knew', past_participle:'known', translate: 'saber'},
			{ infinitive: 'to learn', past: 'learnt', past_participle:'learnt', translate: 'aprender'},
			{ infinitive: 'to leave', past: 'left', past_participle:'left', translate: 'sair'},
			{ infinitive: 'to lend', past: 'lent', past_participle:'lent', translate: 'emprestar'},
			{ infinitive: 'to let', past: 'let', past_participle:'let', translate: 'deixar'},
			{ infinitive: 'to lose', past: 'lost', past_participle:'lost', translate: 'perder'},
			{ infinitive: 'to make', past: 'made', past_participle:'made', translate: 'fazer'},
			{ infinitive: 'to mean', past: 'meant', past_participle:'meant', translate: 'significar'},
			{ infinitive: 'to meet', past: 'met', past_participle:'met', translate: 'conhecer'},
			{ infinitive: 'to put', past: 'put', past_participle:'put', translate: 'colocar'},
			{ infinitive: 'to quit', past: 'quit', past_participle:'quit', translate: 'desistir'},
			{ infinitive: 'to read', past: 'read', past_participle:'read', translate: 'ler'},
			{ infinitive: 'to ride', past: 'rode', past_participle:'ridden', translate: 'pilotar'},
			{ infinitive: 'to ring', past: 'rang', past_participle:'rung', translate: 'correr'},
			{ infinitive: 'to run', past: 'ran', past_participle:'run', translate: 'correr'},
			{ infinitive: 'to say', past: 'said', past_participle:'said', translate: 'dizer'},
			{ infinitive: 'to see', past: 'saw', past_participle:'seen', translate: 'ver'},
			{ infinitive: 'to sell', past: 'sold', past_participle:'sold', translate: 'vender'},
			{ infinitive: 'to send', past: 'sent', past_participle:'sent', translate: 'enviar'},
			{ infinitive: 'to sing', past: 'sang', past_participle:'sung', translate: 'cantar'},
			{ infinitive: 'to sit', past: 'sat', past_participle:'sat', translate: 'sentar'},
			{ infinitive: 'to sleep', past: 'slept', past_participle:'slept', translate: 'dormir'},
			{ infinitive: 'to speak', past: 'spoke', past_participle:'spoken', translate: 'falar'},
			{ infinitive: 'to spend', past: 'spent', past_participle:'spent', translate: 'gastar'},
			{ infinitive: 'to steal', past: 'stole', past_participle:'stolen', translate: 'roubar'},
			{ infinitive: 'to stand', past: 'stood', past_participle:'stood', translate: 'levantar'},
			{ infinitive: 'to swear', past: 'swore', past_participle:'sworn', translate: 'jurar'},
			{ infinitive: 'to swim', past: 'swam', past_participle:'swum', translate: 'nadar'},
			{ infinitive: 'to take', past: 'took', past_participle:'taken', translate: 'tomar, pegar'},
			{ infinitive: 'to teach', past: 'taught', past_participle:'taught', translate: 'ensinar'},
			{ infinitive: 'to tell', past: 'told', past_participle:'told', translate: 'contar, dizer'},
			{ infinitive: 'to think', past: 'thought', past_participle:'thought', translate: 'pensar'},
			{ infinitive: 'to throw', past: 'threw', past_participle:'thrown', translate: 'arremessar'},
			{ infinitive: 'to undestand', past: 'understood', past_participle:'understood', translate: 'entender'},
			{ infinitive: 'to wake', past: 'woke', past_participle:'woke/woken', translate: 'acordar'},
			{ infinitive: 'to wear', past: 'wore', past_participle:'worn', translate: 'vestir'},
			{ infinitive: 'to win', past: 'won', past_participle:'won', translate: 'vestir'},
			{ infinitive: 'to write', past: 'wrote', past_participle:'written', translate: 'escrever'},
		];
	}

	const _limitVerbs = function() {
		if( this.total_verbs > 0 ) {
			this.verbs = this.verbs.splice(0, this.total_verbs);
		}
	}

	const _setProprieties = function(options) {
		this.is_validating_past = true;
		this.is_validating_past_participle = true;
		this.total_verbs = 20;

		if( options != undefined) {
			//console.log('options: ' + JSON.stringify(options))
			if( typeof options.validate_past != 'undefined' ) {
				this.is_validating_past = options.validate_past;
			}
			if( typeof options.validate_past_participle != 'undefined' ) {
				this.is_validating_past_participle = options.validate_past_participle;
			}
			if( typeof options.total_verbs != 'undefined' ) {
				this.total_verbs = options.total_verbs;
			}
			//console.log('past: ' + JSON.stringify(this.is_validating_past))
			//console.log('past_participle: ' + JSON.stringify(this.is_validating_past))
			//console.log('past: ' + JSON.stringify(this.is_validating_past))
			//console.log('\n\n =========================== \n\n')
		}
	}

	const _setPointsInZero = function() {
		this.points = {
			correct: 0,
			wrong: 0,
			consective: 0,
			max_consective: 0
		}
	}


	class IrregularVerbs {

		constructor(options) {

			_setProprieties.call(this, options);
			_setVerbs.call(this);
			_shuffleVerbs(this.verbs);
			_limitVerbs.call(this)
			_setPointsInZero.call(this)

		}

		isValidatingPast() {
			return this.is_validating_past;
		}
		isValidatingPastParticiple() {
			return this.is_validating_past_participle;
		}

		getTotalVerbs() {
			return this.total_verbs;
		}

		setNewVerb() {

			this.current_verb = this.verbs[ 0 ];
			this.in_game = true;

			this.verbs.splice(0, 1);

			return this.current_verb.infinitive;
		}

		getInfinitiveVerb() {
			return this.current_verb.infinitive;
		}

		getAnswer() {
			this.in_game = false;
			return this.current_verb;
		}

		testAnswer(answer) {

			let test_answers = {
				past: (answer.past.toLowerCase() == this.current_verb.past),
				past_participle: (answer.past_participle.toLowerCase() == this.current_verb.past_participle)
			}

			_calculatePoints.call(this, test_answers);

			return test_answers;
		}

		isFinishedGame() {
			if( this.verbs.length == 0 ) {
				return true;
			}
			return false;
		}

		getPoints() {
			return this.points;	
		}

		static getTotalVerbs() {
			_setVerbs.call(this);
			return this.verbs.length;
		}

	}

	return IrregularVerbs;
})();