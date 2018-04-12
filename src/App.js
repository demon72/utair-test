import React, { Component } from 'react';
import './main.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hex:'',
      cards: JSON.parse(localStorage.getItem('cards')) || []
    };
    this.addCard = this.addCard.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  deleteCard (index) {
    this.state.cards.splice(index,1);
    localStorage.removeItem('cards')
    localStorage.setItem('cards',JSON.stringify(this.state.cards));
    this.setState({cards:this.state.cards});
  }

  handleChange (e) {
    var value = e.target.value;
    this.setState({hex:value});
  }

  addCard () {
    this.state.cards.unshift({hex:'#'+this.state.hex,favorite:false});
    this.setState({cards:this.state.cards});
    this.setState({hex:''});
    localStorage.removeItem('cards')
    localStorage.setItem('cards',JSON.stringify(this.state.cards));
  }

  addFavorite (index) {
    var cards = this.state.cards;
    cards[index].favorite = true;
    this.setState({cards:cards});
    localStorage.removeItem('cards')
    localStorage.setItem('cards',JSON.stringify(this.state.cards));
  }

  removeFavorite (index) {
    var cards = this.state.cards;
    cards[index].favorite = false;
    this.setState({cards:cards});
    localStorage.removeItem('cards')
    localStorage.setItem('cards',JSON.stringify(this.state.cards));
  }

  render() {
    var self = this  
    return (
      <div className="App">
        <h1 className="title">
          Управление карточками
        </h1>
        <div className="form">
          <input type="text" placeholder="HEX значение" className="form__input" value={this.state.hex || ''} onChange={e => this.handleChange(e)} maxLength="6" />
          <button className="form__button" onClick={this.addCard.bind(this)}>Добавить</button>
        </div>
        <div className="cards">
          {this.state.cards.map(function(obj, index) {
                return <div className="cards__item" key={index} id={'card'+index}>
                  <div className="cards__color" style={{backgroundColor:obj.hex}}>&nbsp;</div>
                  <div className="cards__hex">{obj.hex}</div>
                  <div className="cards__favorite">
                    {obj.favorite?
                      <img alt="favorite" onClick={self.removeFavorite.bind(self,index)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEsSURBVHgBxZftbYQwEESfTvkfOjiXQAehg9DBuYOkA0qhhKQDSkgJJBUkHVxYyboPDtvYxuZJI0AgZtfYA0A89aQ3duJr0nmPApQxFg0Upr8xF1UUZJyZdxSinRmLfinEx4K5qCEzymIs6smMdpjL0GedeKPDPHjNP93sV1wrV7Pts9lXuNHmHj/m+Nts/2a6ICFx3kGnw4pusqIo3/3D3OgKmI6TXrDwntlY4aHGv6RCJam4OgPUhgV0RFBhz/E1ksQ7kUCVYN6TSEta504OnvOvxCOjdiTBvCaNlkgU2ywxK67OG9zI2+nTc01DJDJbbR0NXNNK486EqEe3dEOZwUvPUTmKDf6pqImLSL1Q9EAgGn+3NhT3oxD8badZ360NyYiRyA/LI9tgNf4HmHs63zJkJIwAAAAASUVORK5CYII="/>
                    : 
                      <img alt="favorite" onClick={self.addFavorite.bind(self,index)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHHSURBVHgB1ZbtccIwDIbf9vq/bIC7QTbAnaBsQDaADZoN6AaMABvQDaATJBtAJ6B2I50Vx4E4Ien1uRMGJ1iy9WXgn/Jh5GQkwR9gFV+MvGNkUlJ8ISNGZS8U21FjJBTcrjdiHIWUFG6NTOBOYIIROJDCN/rNLlhiYBJSlIu5Jc3tMTAhH9vj5sAb9OhzUjJD2KionH9Aaa0VRXM8PotnLHMjhZEXbx2N8tjPRnY0V9Bo577Fb35WyN20lQXCxK6zejIfX2K30vKzJ6B3jw3KX41MUT9BHhNU+0DBX9bCogz3R8GlqA1OP2Z+g4UNWON+KDiX5HAnUSOFSxsbQH1TR4v1DtcUMwlaWnqDFao9oPVGlGdA7IUhE4qjcp+xlm4R3zhk7PSq9xOxUFvlXOt7B61GfNPQqDefII83nnPbPKI9nyiLkkJZdDor50DbNTxboNkAi0ZHpL99ZBqF0pH9vkFH5qj7W8HdXDgLQmU5dOmIgus95+lKKLOLzmheppY8BX53ig5wI7B+lbu1Rvlpp1FtqRlcjVggEunv0G6b/iO7oyytUcy9Bfia3IYU1VOI9jv78USGxKLg7nXRfldkgEI/Ulzx+Q/lGsUMd0S9FQAAAABJRU5ErkJggg=="/>
                    }

                    </div>
                  <div className="cards__delete" onClick={self.deleteCard.bind(self,index)}>
                    <img alt="delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAfCAYAAAAMeVbNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG3SURBVHgBtVbtccIwDFW4/q87Ae4EZINmg7YTlA3oBrBBu0GPCVomgA1KJ8CZINkglRI5KD7H+eQdQo4sPwkh24kggALgBdUq4LKPAEzb5ALCOAfm8hAxIbIDzDJB9QTTkKMc6qBIGqNcUIoZ5aPMHAcZaoVygqoMOYyHRlnz+B040jfMBK5EhrKlzPEDj11/zsAAX6gMdYuZk5hRdlnExZ9S5zaktiy3wO6OB58wb/Zr+rLkJ6z7AWYCb8h6+yt3sqh6VtoUnzVBGyO2DvWOEosy3lzSdmTfWNg2bNs4vmTbejO3tsJvvxdj7a6XwReNn3FF7iHywZIaj60m1zAOykmGsJLkNOGWwPQM6iPXLnnDOBGa9ZnI7W2zFA7GcewiMh5bvhhA1Bea9V8buc/WSoS7OyXN/xsJ3a9l5mlPoj6IZXIyc9nrnQHF8SA7RbWRKxgHX4+bkjyqJm2vL50FoYBaEjn+Fbnj8OA8q5YMfc8EW9rryxRdqO7phuNneezSmGySyeOTMY+WTgkbL8XIrsF1O+b4tTb5OneE6gYxKD8w7NpLWAivUbW+Qa5RvcE00GvK3j78A0J9w2kBaAHpAAAAAElFTkSuQmCC"/>
                  </div>
                </div>;
              }
            )  
          }
        </div>
      </div>
    );
  }
}

export default App;
