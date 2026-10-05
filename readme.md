//1. Sobre o arquivo corrompido e o JSON.parse: Se o JSON estiver corrompido (com uma vírgula a menos, por exemplo), 
// o JSON.parse dá um erro e faz o programa quebrar. Para evitar isso, usamos um try...catch: se der erro na leitura, 
// o código avisa o usuário e inicia com listas vazias em vez de crashar o sistema.

 //Sobre salvar a cada cadastro vs. salvar só ao fechar: Salvar a cada cadastro evita perder dados se o PC travar ou a luz acabar, 
 // mas gasta mais desempenho gravando no disco o tempo todo. 
 // Salvar só ao fechar é mais rápido para rodar, mas se o programa fechar sozinho antes, 
 // você perde tudo o que fez.//