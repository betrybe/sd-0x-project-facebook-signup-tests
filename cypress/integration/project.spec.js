const TOP_BAR_SELECTOR = '.top-bar';
const FACEBOOK_LOGOTIPO_SELECTOR = '.facebook-logo';
const FACEBOOK_LOGIN_FORM_SELECTOR = 'form.facebook-login';
const USER_IDENTIFIER_INPUT_SELECTOR = 'input#user-email-phone';
const USER_IDENTIFIER_LABEL_SELECTOR = '#user-email-phone-label';
const USER_PASSWORD_LABEL_SELECTOR = '#user-password-label';
const USER_IDENTIFIER_LABEL_TEXT_SELECTOR = 'Email ou telefone';
const USER_PASSWORD_LABEL_TEXT_SELECTOR = 'Senha';
const USER_PASSWORD_INPUT_SELECTOR = 'input#user-password';
const USER_LOGIN_BUTTON_SELECTOR = '#button-login';
const FACEBOOK_SLOGAN = 'O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.';
const FACEBOOK_NETWORKING_IMG_SELECTOR = '#facebook-networking';
const OPEN_ACCOUNT_MESSAGE = 'Abra uma conta';
const QUICK_AND_SIMPLE_MESSAGE = 'É rápido e fácil.';
const ALL_INPUT_SELECTOR = 'input';
const ALL_PASSWORD_INPUT_SELECTOR = 'input[type=password]';
const BIRTHDATE_TITLE = 'Data de nascimento';
const GENDER_TITLE = 'Gênero';
const GENRES = [
  'Feminino',
  'Masculino',
  'Personalizado'
];
const REGISTER_BUTTON_SELECTOR = 'button#facebook-register';

const checkPlaceholder = (elements, placeholder) => (
  elements.some((element) => Cypress.$(element).attr('placeholder') === placeholder)
);


const evaluateOffset = (doc, selector, offsetType) => {
  return doc.querySelector(selector).getBoundingClientRect()[`${offsetType}`];
};


const checkIsRightOf = (elementLeftSelector, elementRightSelector) => {
  cy.document().then(doc => {
    const elementLeft = {
      top: evaluateOffset(doc, elementLeftSelector, 'top'),
      left: evaluateOffset(doc, elementLeftSelector, 'left'),
      width: evaluateOffset(doc, elementLeftSelector, 'width'),
    };

    const elementRight = {
      top: evaluateOffset(doc, elementRightSelector, 'top'),
      left: evaluateOffset(doc, elementRightSelector, 'left'),
      width: evaluateOffset(doc, elementRightSelector, 'width'),
    };

    expect(elementLeft.top == elementRight.top && elementRight.left > elementLeft.left + elementLeft.width).to.be.true;
  });
};


describe('Facebook Signup', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  describe('Posicionamento de elementos utilizando CSS Flexbox', () => {
    it('Deve possuir algum seletor coma propriedade `display: flex`', () => {
      cy.readFile('./style.css')
        .then((content) => {
          expect(content).to.match(/display: ?flex/);
        });
      });

  });

  describe('Uma barra azul na parte superior da página do **Facebook** com a classe top-bar', () => {
    it('Existe um elemento com a classe top-bar', () => {
      cy.get(TOP_BAR_SELECTOR).should('exist');
    });

    it('A classe top-bar deve possuir a propriedade `background-color: rgb(66, 103, 178)`', () => {
      cy.get('.top-bar').should('have.css', 'background-color', 'rgb(66, 103, 178)');
    });
  });

  describe('O logotipo do Facebook no canto superior esquerdo com a classe facebook-logo', () => {
    it('Existe um elemento img com a classe facebook-logo', () => {
      cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('exist');
    });
    
    it('O atributo src deve apontar para ./imgs/facebook-logo.png', () => {
      cy.get(FACEBOOK_LOGOTIPO_SELECTOR).should('have.attr', 'src').should('equal','./imgs/facebook-logo.png')
    });

    it('O elemento img deve estar alinhado a esquerda dentro da barra azul', () => {
      cy.get('.facebook-logo').should('be.leftAligned', '.top-bar');
    });
  });

  describe('Um formulário de autenticação (login) no canto superior direito', () => {
    it('Existe formulário possui uma classe chamada facebook-login', () => {
      cy.get(FACEBOOK_LOGIN_FORM_SELECTOR).should('exist');
    });


    it('O formulário deve estar alinhado a direita dentro da barra azul', () => {
      cy.get('.facebook-login').should('be.rightAligned', '.top-bar');
    });

    it('Um título com o texto "Email ou telefone" acima do campo de entrada de texto para email ou telefone com o id user-email-phone-label', () => {
      cy.get(USER_IDENTIFIER_LABEL_SELECTOR)
        .should('exist')
        .should('have.text', USER_IDENTIFIER_LABEL_TEXT_SELECTOR)
        .should('be.above', USER_IDENTIFIER_INPUT_SELECTOR, 1);
    });
  
    it('Um campo de entrada de texto no canto superior direito para receber o email ou o telefone do usuário com o id user-email-phone', () => {
      cy.get(USER_IDENTIFIER_INPUT_SELECTOR).should('exist');
    });

    it('Um título com o texto "Senha" acima do campo de entrada de texto para senha com o id user-password', () => {
      cy.get(USER_PASSWORD_LABEL_SELECTOR)
        .should('exist')
        .should('have.text', USER_PASSWORD_LABEL_TEXT_SELECTOR)
        .should('be.above', USER_PASSWORD_INPUT_SELECTOR, 1);
    });

    it('Um campo de entrada de texto para digitar a senha do usuário, à direita do campo de entrada de texto para email ou telefone', () => {
      cy.get(USER_PASSWORD_INPUT_SELECTOR).should('have.attr', 'type', 'password');

      checkIsRightOf(USER_IDENTIFIER_INPUT_SELECTOR, USER_PASSWORD_INPUT_SELECTOR);

    });

    it('Um botão com o id "button-login" e o texto "Entrar", à direita do campo de entrada de texto para senha', () => {
      const content = 'my-user';
      let alerted = false;
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal(content);
        alerted = true;
      });

      checkIsRightOf(USER_PASSWORD_INPUT_SELECTOR, USER_LOGIN_BUTTON_SELECTOR);

      cy.get(USER_IDENTIFIER_INPUT_SELECTOR).type(content);
      cy.get(USER_LOGIN_BUTTON_SELECTOR)
        .should('exist')
        .should('have.text', 'Entrar')
        .click().then(()=> {
          expect(alerted).to.eq(true);
        });
    });
  });

  

  

  

  

  // it('Um texto "O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida."', () => {
  //   cy.contains(FACEBOOK_SLOGAN);
  // });

  // it('Uma imagem com id facebook-networking, que ficará abaixo do item 8. Essa imagem deve conter o mapa do mundo e as conexões entre as pessoas', () => {
  //   cy.get(FACEBOOK_NETWORKING_IMG_SELECTOR)
  //     .should('exist')
  //     .should(($el) => {
  //       const src = $el.attr('src');
  //       expect(src).to.match(/networking/);
  //     });
  //   // assert position
  // });

  // it('Um texto "Abra uma conta" posicionado abaixo da caixa de texto de email/telefone', () => {
  //   cy.contains(OPEN_ACCOUNT_MESSAGE);
  //   // assert position
  // });

  // it('Um texto "É rápido e fácil." posicionado abaixo do texto "Abra uma conta"', () => {
  //   cy.contains(QUICK_AND_SIMPLE_MESSAGE);
  //   // assert position
  // });

  // it('Um campo de entrada de texto para o nome do usuário. Posicione esse campo abaixo do texto "É rápido e fácil."', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Nome')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um campo de entrada de texto para o sobrenome do usuário. Posicione esse campo à direita do campo nome', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Sobrenome')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um campo de entrada de texto para o celular ou email. Posicione esse campo abaixo do sobrenome do usuário', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Celular ou email')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um campo de entrada de texto para a nova senha do usuário. Posicione esse campo abaixo do celular/email', () => {
  //   cy.get(ALL_PASSWORD_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'Nova senha')).to.be.true;
  //     });
  //   // assert position
  // });

  // it('Um texto "Data de nascimento" abaixo do campo de entrada de texto de nova senha', () => {
  //   cy.contains(BIRTHDATE_TITLE);
  //   // assert position
  // });

  // it('Um campo para selecionar a data de nascimento', () => {
  //   cy.get(ALL_INPUT_SELECTOR)
  //     .then(($inputs) => {
  //       const elements = $inputs.toArray();
  //       expect(checkPlaceholder(elements, 'dd/mm/aaaa')).to.be.true;
  //     });
  // });

  // it('Um texto "Gênero" abaixo dos campos de data', () => {
  //   cy.contains(GENDER_TITLE);
  // });

  // it('Três `radio buttons` com os nomes "Feminino", "Masculino" e "Personalizado"', () => {
  //   cy.get("input[type='radio']")
  //     .should(($radios) => {
  //       expect($radios).to.have.length(GENRES.length);
  //       $radios.each((index, radio) => {
  //         expect(Cypress.$(radio).val()).to.equal(GENRES[index]);
  //       });
  //     });
  // });

  // it('Um botão com o texto "Cadastre-se" e id "facebook-register"', () => {
  //   cy.get(REGISTER_BUTTON_SELECTOR)
  //     .should('exist')
  //     .click();
  // });
});
