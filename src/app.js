var Choice = React.createClass({
  getInitialState: function() {
    return {
      className: ''
    };
  },
  
  onClick: function(ev) {
    if (this.props.correct) {
      this.setState({className: 'correct'});
    } else {
      this.setState({className: 'wrong'});
    }
    this.props.onAnswer(this.props.answer);
  },
  
  render: function() {
    return (
      <li onClick={this.onClick} className={this.state.className}>
      {this.props.answer}
      </li>
    );
  }
});

var Quiz = React.createClass({
  getInitialState: function() {
    return {
      explanation: '',
    };
  },

  onAnswer: function(answer) {
    this.setState({explanation: this.props.explanation});
  },

  renderChoices: function() {
    return this.props.choices.map(function(choice) {
      return (
        <Choice answer={choice.answer} correct={choice.correct} onAnswer={this.onAnswer} key={choice.answer} />
      );
    }.bind(this));
  },
  
  render: function() {
    return (
      <div>
      <h2>{this.props.question}</h2>
      {this.renderChoices()}
      <p className="hidden">{this.state.explanation}</p>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    var shuffledChoices = _.shuffle(this.props.quiz.choices);
    
    return (
      <div>
      <h1>Quiz</h1>
      <Quiz question={this.props.quiz.question} choices={shuffledChoices} explanation={this.props.quiz.explanation} />
      </div>
    );
  }
});

var quiz = {
  question: "Facebook が開発した Web アプリケーションの UI 用フレームワークは次のうちどれか？",
  choices: [
    {
      answer: "React",
      correct: true
    },
    {
      answer: "Angular",
      correct: false
    },
    {
      answer: "Backbone",
      correct: false
    },
    {
      answer: "Ruby on Rails",
      correct: false
    }
  ],
  explanation: "正解は React です。 Angular は Google が開発した UI フレームワークです。 Backbone は DocumentCloud が開発した UI フレームワークです。 Ruby on Rails は DHH が開発した Web アプリケーションフレームワークです。"
};

React.render(
  <App quiz={quiz} />,
  document.getElementById('example')
);
