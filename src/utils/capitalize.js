    function abreviacao(s) {
        return /^([A-Z]\.)+$/.test(s);
    }

    function numeralRomano(s) {
        return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(s);
    }

    function capitalize(texto) {
        let prepos = ["da", "do", "das", "dos", "a", "e", "de" ];
        return texto.replace(/rn/g, '').replace(/Rn/g, '').replace(/RN/g, '').replace(/Rio Grande do Norte/g, '').replace(/rio grande do norte/g, '').split(' ') // quebra o texto em palavras
           .map((palavra) => { // para cada palavra
               if (abreviacao(palavra) || numeralRomano(palavra)) {
                    return palavra;
               }

               palavra = palavra.toLowerCase();
               if (prepos.includes(palavra)) {
                    return palavra;
               }
               return palavra.charAt(0).toUpperCase() + palavra.slice(1);
           })
           .join(' ').trim(); // junta as palavras novamente
    }

export {
    capitalize
};
