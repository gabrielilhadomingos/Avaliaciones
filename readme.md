O jogo e divido em classes onde há uma classe para a entidade, o personagem, o inimigo e o tiro.
O personagem extende a classe entidade, a classe inimigo tambem extende da classe entidade, o tiro e uma extensão da classe personagem ja que so o personagem principal pode atirar.

No polimorfismo foi um pouco complicado ja que se você quiser desenhar por exemplo um triangulo, você deve fazer exatamente cada parte do formato, por exemplo um triangulo, onde ele tem uma ponta, a ponta esquerda e a ponta direita, o polimorfismo da bola foi ate mais tranquilo comparado ao do triangulo.

Eu tambem usei e dei uma pesquisada no metodo math para colocar a questão da posição e movimentação do personagem melhor, ja que seria mais precisa e ate mesmo melhor, juntamente usei o metodo math para a velocidade dos tiros e tambem para a pontuação que adiciona de 100 em 100 a cada inimigo destruído no jogo, eu irei mudar o Math.random do inimigo para se manter estatico igual ao jogo e ir caindo de acordo com um certo periodo de tempo.

A posição inicial do meu personagem e de acordo com a largura da tela divido por 2, assim como o game over que a altura e 170 mas em relação a tela tambem e divido por dois para ficar exatamente no meio da tela, a do personagem eu dei uma ajustada ja que da primeira vez que fiz, ele ficava no centro da tela, então mudei a altura para ficar de acordo.

Eu tentei implementar para ficar igual do space invaders, mas deu muito errado, então apenas adaptei para que os inimigos caiam mais lento para o jogo ficar balanceado