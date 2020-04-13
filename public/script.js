var contadorMudancas = 0;
var pontosAtributoPorNivel = [100,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,15,15,15,15,15,16,16,16,16,16,17,17,17,17,17,18,18,18,18,18,19,19,19,19,19,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,30,30,30,30,31,31,31,31];
var pontosGastosPorAtributo = [0,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,16,16,16,16,16,20,20,20,20,20,24,24,24,24,24,28,28,28,28,28,32,32,32,32,32,36,36,36,36,36];

bonusClasseFor = [0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,4,4,4,4,4,4,4,4,4,5,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7];
bonusClasseAgi = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,5];
bonusClasseVit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,5,5,5,6,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8];
bonusClasseInt = [0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6];
bonusClasseDes = [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4];
bonusClasseSor = [0,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6];

jobASPD = 149;

$(document).ready(function(){
  sapatosAntigos = "";
  $(".porcentagem").each(function(){
    $(this).before("<div class='flutuante'>%</div>");
  });
  $(".porcentagem").keyup(function(){
    $(this).val($(this).val().replace("%",""));
  });
  $(".numero").each(function(){
    if($(this).val() == "" || $(this).val() == "") { $(this).val(0); }
  });

  if($("#adotado").is(":checked")) { maximoAtributos = "117"; } else { maximoAtributos = "130"; }
  $(".atributo input[type=text]").each(function(){
    if($(this).val() == "1") { $(".menos." + $(this).attr("id")).attr("disabled", true); }
    if($(this).val() == maximoAtributos) { $(".mais." + $(this).attr("id")).attr("disabled", true); }
  });
  $(".atributo input[type=text]").on("change", function(){
    if(!$.isNumeric($(this).val())) { $(this).val(1); }
    if(parseInt($(this).val()) > maximoAtributos) { $(this).val(maximoAtributos); }
    if($(this).val() == "1") {
      $(".menos." + $(this).attr("id")).attr("disabled", true);
    } else {
      $(".menos." + $(this).attr("id")).attr("disabled", false);
    }
    if($(this).val() == maximoAtributos) {
      $(".mais." + $(this).attr("id")).attr("disabled", true);
      $("#"+($(this).attr("id"))+"next").val("(0)");
    }
    else {
      $(".mais." + $(this).attr("id")).attr("disabled", false);
      $("#"+($(this).attr("id"))+"next").val("(" + pontosGastosPorAtributo[parseInt($(this).val())] + ")");
    }
  });
  $(".controladorAtributos").click(function() {
    var element = $(this).attr("class").replace("menos","").replace("mais","").replace("controladorAtributos","").trim();
    var numero = parseInt($("#" + element).val());
    if($("#adotado").is(":checked")) { maximoAtributos = 117; } else { maximoAtributos = 130; }
    if($(this).hasClass("menos")) {
      if(numero > 1) { $("#" + element).val(numero - 1); }
      if(numero < 1) { $("#" + element).val(0); }
    }
    if($(this).hasClass("mais")) {
      if(numero < maximoAtributos) { $("#" + element).val(numero + 1); }
      if(numero > maximoAtributos) { $("#" + element).val(maximoAtributos); }
    }
    $("#" + element).focus();
    $("#" + element).trigger("change");
  });
  $("table img").click(function() {
    var idItem = $(this).closest("table").find("#itemTopo, #itemMeio, #itemBaixo, #itemArmadura, #itemArco, #itemEscudo, #itemCapa, #itemSapatos, #itemAcessorio1, #itemAcessorio2").val().replace(/[a-z]/g,"");
    var thisImg = $(this);
    if(idItem != "") {
      var temp = thisImg.attr("src");
      thisImg.attr("src","https://i.imgur.com/qEkaXFU.png");
      axios.get('/api/item/' + idItem).then(data => {
        let texto = data.data.description;
        texto = "<span>" + texto.replace(/(\^[0-9a-zA-Z]{6})/g,"</span><span style='color:#$1'>").replace(/\^/g,"").replace(/\n/g,"<br />") + "</span>";
        $("#descricaoItem .nomeItem").html(data.data.name);
        $("#descricaoItem .descItem").html(texto);
        $("#descricaoItem .imagItem img").attr("src","https://www.divine-pride.net/img/items/collection/bRO/" + idItem);
        $("#descricaoItem").show();
        thisImg.attr("src",temp);
      });
    }
  });
  $("#descricaoItem .close").click(function() {
    $("#descricaoItem").hide();
  });
  $("#adotado").on("change", function() {
    if($(this).is(":checked")) {
      $(".atributo input[type=text]").each(function(){
        if(parseInt($(this).val()) > 117) {
          $(this).val(117);
          $(this).trigger("change");
        }
        if(parseInt($(this).val()) == 117) {
          $(".controladorAtributos.mais." + $(this).attr("id")).attr("disabled", true);
        }
      });
    } else {
      $(".controladorAtributos.mais").attr("disabled", false)
    }
    calcularPontosAtributo();
  });
  $("#nivelClasse").on("change", function() {
    if(!$.isNumeric($(this).val())) { $(this).val(60); }
    var value = parseInt($("#nivelClasse").val());
    if(value < 1) { $("#nivelClasse").val(1); }
    if(value > 60) { $("#nivelClasse").val(60); }
  });

  $("#carregarMonstro").on("change", function(){
    var thisElement = $(this);
    var idMonstro = $(this).val();
    let conversaoPropriedades = [0,4,3,1,2,8,5,6,9,7];
    let conversaoRaca = [0,7,2,9,6,8,3,5,1,4];
    if(idMonstro != "") {
      let textoOpcaoSelecionada = $(this).find("option:selected").text();
      $(this).find("option:selected").text("Carregando...");
      $(this).attr("disabled", true);
      axios.get('/api/monster/' + idMonstro).then(data => {
        var novaPosicao = (conversaoPropriedades[data.data.stats.element % 10] * 10) + (parseInt(data.data.stats.element / 20) - 1);
        if(novaPosicao < 10) novaPosicao = "0" + novaPosicao;
        $("#propriedadeMonstro").val(novaPosicao);
        $("#racaMonstro").val(conversaoRaca[data.data.stats.race]);
        $("#hardDEF").val(data.data.stats.defense);
        $("#tamanho").val(data.data.stats.scale);
        if(data.data.stats.mvp == 1) { $("#chefe").attr("checked", true); } else { $("#chefe").attr("checked", false); }
        $(this).attr("disabled", false);
        $(this).find("option:selected").text(textoOpcaoSelecionada);
        $("#monster-image").css("background-image", "url(https://static.divine-pride.net/images/mobs/png/"+idMonstro+".png)");
        $("#agi").trigger("change");
      });
    } else {
      $("#monster-image").css("background-image", "none");
    }
  });
  $("#hardDEF, #racaMonstro, #propriedadeMonstro, #tamanho, #chefe").on("change", function() {
    if($("#carregarMonstro").val() != "") {
      $("#carregarMonstro").val("");
      $("#monster-image").css("background-image", "none");
    }
  });

  $(".lista-filtros input").on("change", function() {
    $(".lista-consumiveis div").hide();
    switch($(".lista-filtros input:checked").val()) {
      case "crit":
        $(".lista-consumiveis div.filtro-crit").show();
        break;
      case "aspd":
        $(".lista-consumiveis div.filtro-aspd").show();
        break;
      case "dano":
        $(".lista-consumiveis div.filtro-dano").show();
        break;
      default:
        $(".lista-consumiveis div").show();
    }
  });

  $(".balloon .show, .balloon .hide .close").click(function() {
    $(this).closest(".balloon").toggleClass("showing");
    if($(this).is("#monster-image .close")) $(this).closest(".balloon").hide();
  });

  function colorirInput() {
    $("input.numero").each(function(){
      if(parseInt($(this).val()) >  0) { $(this).closest("td").css("color","#03BD03"); }
      if(parseInt($(this).val()) == 0) { $(this).closest("td").css("color","#000000"); }
      if(parseInt($(this).val()) <  0) { $(this).closest("td").css("color","#CE1820"); }
    });
  }

  var lastStylizedClicked = false;
  function stylizeSelect(selectElement) {
    let newSelectId = selectElement.attr("id");
    let optionSelected = selectElement.find("option:selected").text();
    let optionsTextColor = selectElement.css("color");
    let newSelect = `<div class="select-group` + (selectElement.attr("disabled") ? " disabled" : "") + `" select-target="` + newSelectId + `">
      <span style="color: ` + optionsTextColor + `">` + optionSelected + `</span>
        <div class="select-options-group">
          <div class="select-text">
            <input type="text" placeholder="Filtrar">
          </div>
          <div class="select-options">`;
    selectElement.find("option").each(function() {
      let optionValue = $(this).val();
      let optionText = $(this).text();
      newSelect += `<span tabindex='' value="` + optionValue + `">` + optionText + `</span>`;
    });
    newSelect += `</div>
    </div>`;
    selectElement.hide();
    selectElement.before(newSelect);
  }

  function destroyStylizedSelect(selectElement) {
    selectElement.remove();
  }

  $("select").each(function() {
    stylizeSelect($(this));
  });

  $(".select-group > span").on("click", function() {
    if(!$(this).closest(".select-group").is(".disabled")) {
      $(".select-group .select-options span.tempselect").removeClass("tempselect");
      let selectGroup = $(this).closest(".select-group");
      if(selectGroup.hasClass("active")) {
        selectGroup.removeClass("active");
      } else {
        selectGroup.addClass("active");
        selectGroup.find(".select-options").scrollTop(0);
        selectGroup.find("input").focus();
      }
    }
  });
  $(window).click(function(e) {
    $target = $(event.target);
    $(".select-group.active").not($target.closest(".select-group.active")).removeClass("active");
  });
  // jQuery.expr[':'].Contains = function(a, i, m) {
  //   return jQuery(a).text().toUpperCase()
  //       .indexOf(m[3].toUpperCase()) >= 0;
  // };
  function retira_acentos(nome) {
    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    novoNome="";
    for(i=0; i<nome.length; i++) {
      troca=false;
      for (a=0; a<com_acento.length; a++) {
        if (nome.substr(i,1)==com_acento.substr(a,1)) {
          novoNome+=sem_acento.substr(a,1);
          troca=true;
          break;
        }
      }
      if (troca==false) {
        novoNome+=nome.substr(i,1);
      }
    }
    return novoNome.toUpperCase();
  }
  var selectGroupCurrentPosition = 0;
  $(".select-group input").keyup(function(e) {
    let textInput = $(this).val();
    let thisElem = $(this).closest(".select-group").find(".select-options span");
    if(e.which == 38 || e.which == 40) {
      // nothing
    } else {
      selectGroupCurrentPosition = 0;
      thisElem.hide();
      //$(this).closest(".select-group").find(".select-options span:Contains(" + textInput + ")").show();
      thisElem.each(function(){
        if(retira_acentos($(this).text()).includes(retira_acentos(textInput))) {
          $(this).show();
        }
      });
    }
  });
  $(".select-group input").focus(function(){
    selectGroupCurrentPosition = 0;
  });
  $(window).keydown(function(e){
    if(e.which == 38 || e.which == 40) {
      e.preventDefault();
    }
  });
  $(window).keyup(function(e){
    e.preventDefault();
    if(e.which == 38 || e.which == 40) {
      var arrayCompleto = $(".select-group.active input, .select-group.active .select-options span");
      $(".select-group.active input, .select-group.active .select-options span.tempselect").removeClass("tempselect");
      if(e.which == 38 && selectGroupCurrentPosition > 0) {
        selectGroupCurrentPosition--;
      }
      if(e.which == 40 && selectGroupCurrentPosition < arrayCompleto.length) {
        selectGroupCurrentPosition++;
      }
      if(selectGroupCurrentPosition != 0) {
        arrayCompleto.eq(selectGroupCurrentPosition).addClass("tempselect");
      }
      arrayCompleto.eq(selectGroupCurrentPosition).focus();
    }
    if(e.which == 13) {
      $(".select-group.active :focus").click();
    }
  });
  $(".select-options span").click(function() {
    let optionValue = $(this).attr("value");
    let optionText = $(this).text();
    let optionId = $(this).closest(".select-group").attr("select-target");
    lastStylizedClicked = optionId;
    $("#" + optionId).val(optionValue);
    $(this).closest(".select-group").find("> span").text(optionText);
    $(this).closest(".select-options").find("span").removeClass("active");
    $(this).addClass("active");
    $(".select-group.active").removeClass("active");
    $("#" + optionId).trigger("change");
  });

  colorirInput();

  $("input.numero").change(function(){
    colorirInput();
  });

  function resetarTopo() {
    imagemTopo = "https://i.imgur.com/OWGO9bw.png"; encantamentoTopo = 0; slotsTopo = 0; itemATaxaCritico = 0; itemAAspdPorcentagem = 0; itemAAspdFixa = 0; itemATaxaCritico = 0; itemAAspdPorcentagem = 0; itemAAspdFixa = 0; itemAIgnorarDefesa = 0; itemAAtaque = 0; itemAAtaqueArmaPorcentagem = 0; itemADanoFisico = 0; /* itemADanoFisicoMonstro = 0; */ itemADanoMVP = 0; itemADanoDistancia = 0; itemADanoCriticoPorcentagem = 0; itemADanoFisico = 0; itemADanoRacial = 0; itemADanoPropriedade = 0; itemADanoTamanho = 0; itemAForca = 0; itemAAgilidade = 0; itemADestreza = 0; itemASorte = 0;
  }

  function resetarMeio() {
    imagemMeio = "https://i.imgur.com/OWGO9bw.png"; encantamentoMeio = 0; slotsMeio = 0; itemBTaxaCritico = 0; itemBAspdPorcentagem = 0; itemBAspdFixa = 0; itemBTaxaCritico = 0; itemBAspdPorcentagem = 0; itemBAspdFixa = 0; itemBIgnorarDefesa = 0; itemBAtaque = 0; itemBAtaqueArmaPorcentagem = 0; itemBDanoFisico = 0; /* itemBDanoFisicoMonstro = 0; */ itemBDanoMVP = 0; itemBDanoDistancia = 0; itemBDanoCriticoPorcentagem = 0; itemBDanoFisico = 0; itemBDanoRacial = 0; itemBDanoPropriedade = 0; itemBDanoTamanho = 0; itemBForca = 0; itemBAgilidade = 0; itemBDestreza = 0; itemBSorte = 0;
  }

  function resetarBaixo() {
    imagemBaixo = "https://i.imgur.com/OWGO9bw.png"; itemCTaxaCritico = 0; itemCAspdPorcentagem = 0; itemCAspdFixa = 0; itemCTaxaCritico = 0; itemCAspdPorcentagem = 0; itemCAspdFixa = 0; itemCIgnorarDefesa = 0; itemCAtaque = 0; itemCAtaqueArmaPorcentagem = 0; itemCDanoFisico = 0; /* itemCDanoFisicoMonstro = 0; */ itemCDanoMVP = 0; itemCDanoDistancia = 0; itemCDanoCriticoPorcentagem = 0; itemCDanoFisico = 0; itemCDanoRacial = 0; itemCDanoPropriedade = 0; itemCDanoTamanho = 0; itemCForca = 0; itemCAgilidade = 0; itemCDestreza = 0; itemCSorte = 0;
  }

  function resetarArmadura() {
    imagemArmadura = "https://i.imgur.com/OWGO9bw.png"; encantamentoArmadura = 0; slotsArmadura = 0; itemDTaxaCritico = 0; itemDAspdPorcentagem = 0; itemDAspdFixa = 0; itemDTaxaCritico = 0; itemDAspdPorcentagem = 0; itemDAspdFixa = 0; itemDIgnorarDefesa = 0; itemDAtaque = 0; itemDAtaqueArmaPorcentagem = 0; itemDDanoFisico = 0; /* itemDDanoFisicoMonstro = 0; */ itemDDanoMVP = 0; itemDDanoDistancia = 0; itemDDanoCriticoPorcentagem = 0; itemDDanoFisico = 0; itemDDanoRacial = 0; itemDDanoPropriedade = 0; itemDDanoTamanho = 0; itemDForca = 0; itemDAgilidade = 0; itemDDestreza = 0; itemDSorte = 0;
  }

  function resetarArco() {
    imagemArco = "https://i.imgur.com/OWGO9bw.png"; encantamentoArco = 0; slotsArco = 0; itemETaxaCritico = 0; itemEAspdPorcentagem = 0; itemEAspdFixa = 0; itemETaxaCritico = 0; itemEAspdPorcentagem = 0; itemEAspdFixa = 0; itemEIgnorarDefesa = 0; itemEAtaque = 0; itemEAtaqueEquipamento = 0; flechaAtaque = 0; itemEAtaqueArmaPorcentagem = 0; itemEDanoFisico = 0; /* itemEDanoFisicoMonstro = 0; */ itemEDanoMVP = 0; itemEDanoDistancia = 0; itemEDanoCriticoPorcentagem = 0; itemEDanoFisico = 0; itemEDanoRacial = 0; itemEDanoPropriedade = 0; itemEDanoTamanho = 0; itemEForca = 0; itemEAgilidade = 0; itemEDestreza = 0; itemESorte = 0;
  }

  function resetarEscudo() {
    imagemEscudo = "https://i.imgur.com/OWGO9bw.png"; itemJAtaque = 0;
  }

  function resetarCapa() {
    imagemCapa = "https://i.imgur.com/OWGO9bw.png"; encantamentoCapa = 0; slotsCapa = 0; itemFTaxaCritico = 0; itemFAspdPorcentagem = 0; itemFAspdFixa = 0; itemFTaxaCritico = 0; itemFAspdPorcentagem = 0; itemFAspdFixa = 0; itemFIgnorarDefesa = 0; itemFAtaque = 0; itemFAtaqueArmaPorcentagem = 0; itemFDanoFisico = 0; itemFDanoFisicoMonstro = 0; itemFDanoMVP = 0; itemFDanoDistancia = 0; itemFDanoCriticoPorcentagem = 0; itemFDanoFisico = 0; itemFDanoRacial = 0; itemFDanoPropriedade = 0; itemFDanoTamanho = 0; itemFForca = 0; itemFAgilidade = 0; itemFDestreza = 0; itemFSorte = 0;
  }

  function resetarSapatos() {
    imagemSapatos = "https://i.imgur.com/OWGO9bw.png"; encantamentoSapatos = 0; slotsSapatos = 0; itemGTaxaCritico = 0; itemGAspdPorcentagem = 0; itemGAspdFixa = 0; itemGTaxaCritico = 0; itemGAspdPorcentagem = 0; itemGAspdFixa = 0; itemGIgnorarDefesa = 0; itemGAtaque = 0; itemGAtaqueArmaPorcentagem = 0; itemGDanoFisico = 0; itemGDanoFisicoMonstro = 0; itemGDanoMVP = 0; itemGDanoDistancia = 0; itemGDanoCriticoPorcentagem = 0; itemGDanoFisico = 0; itemGDanoRacial = 0; itemGDanoPropriedade = 0; itemGDanoTamanho = 0; itemGForca = 0; itemGAgilidade = 0; itemGDestreza = 0; itemGSorte = 0;
  }

  function resetarAcessorio1() {
    imagemAcessorio1 = "https://i.imgur.com/OWGO9bw.png"; encantamentoAcessorio1 = 0; slotsAcessorio1 = 0; itemHTaxaCritico = 0; itemHAspdPorcentagem = 0; itemHAspdFixa = 0; itemHTaxaCritico = 0; itemHAspdPorcentagem = 0; itemHAspdFixa = 0; itemHIgnorarDefesa = 0; itemHAtaque = 0; itemHAtaqueArmaPorcentagem = 0; itemHDanoFisico = 0; itemHDanoFisicoMonstro = 0; itemHDanoMVP = 0; itemHDanoDistancia = 0; itemHDanoCriticoPorcentagem = 0; itemHDanoFisico = 0; itemHDanoRacial = 0; itemHDanoPropriedade = 0; itemHDanoTamanho = 0; itemHForca = 0; itemHAgilidade = 0; itemHDestreza = 0; itemHSorte = 0;
  }

  function resetarAcessorio2() {
    imagemAcessorio2 = "https://i.imgur.com/OWGO9bw.png"; encantamentoAcessorio2 = 0; slotsAcessorio2 = 0; itemITaxaCritico = 0; itemIAspdPorcentagem = 0; itemIAspdFixa = 0; itemITaxaCritico = 0; itemIAspdPorcentagem = 0; itemIAspdFixa = 0; itemIIgnorarDefesa = 0; itemIAtaque = 0; itemIAtaqueArmaPorcentagem = 0; itemIDanoFisico = 0; itemIDanoFisicoMonstro = 0; itemIDanoMVP = 0; itemIDanoDistancia = 0; itemIDanoCriticoPorcentagem = 0; itemIDanoFisico = 0; itemIDanoRacial = 0; itemIDanoPropriedade = 0; itemIDanoTamanho = 0; itemIForca = 0; itemIAgilidade = 0; itemIDestreza = 0; itemISorte = 0;
  }

  function marianne() {
    imagemTopo = "https://i.imgur.com/HEzTtvS.png";
    slotsTopo = 1;
    itemAAtaque = 50;
    itemADestreza = 2;
  }

  function esquilo() {
    imagemTopo = "https://i.imgur.com/NsbeGXx.png";
    slotsTopo = 1;
    itemADanoCriticoPorcentagem = 10;
    itemAIgnorarDefesa = 10;
    itemATaxaCritico = 5;
    itemAAspdFixa = 1;
    if(parseInt($("#refinoItemTopo").val()) >= 7) { itemADanoCriticoPorcentagem = 12; itemAIgnorarDefesa = 25; itemATaxaCritico += 10; itemAAspdFixa += 1; }
    if(parseInt($("#refinoItemTopo").val()) >= 9) { itemADanoCriticoPorcentagem = 18; itemAIgnorarDefesa = 45; itemATaxaCritico += 15; itemAAspdFixa += 1; }
    if(parseInt($("#refinoItemTopo").val()) >= 11) { itemADanoCriticoPorcentagem = 30; itemAIgnorarDefesa = 70; itemATaxaCritico += 20; itemAAspdFixa += 1; }
  }

  function esquiloa() {
    imagemTopo = "https://i.imgur.com/NsbeGXx.png";
    slotsTopo = 1;
    itemADanoCriticoPorcentagem = 130;
    itemAIgnorarDefesa = 70;
    itemATaxaCritico = 50;
    itemAAspdFixa = 4;
    if(parseInt($("#refinoItemTopo").val()) < 11) { $("#refinoItemTopo").val("11").change(); }
  }

  function chique() {
    imagemTopo = "https://i.imgur.com/xEnTLQu.png";
    slotsTopo = 1;
    itemAAtaque = parseInt(parseInt($("#refinoItemTopo").val()) / 2) * 15;
    if(parseInt($("#refinoItemTopo").val()) >= 7) { itemADanoDistancia = itemADanoDistancia + 7; } if(parseInt($("#refinoItemTopo").val()) >= 11) { itemADanoDistancia = itemADanoDistancia + 5; }
    if(parseInt($("#refinoItemTopo").val()) >= 9) { itemAAtaqueArmaPorcentagem = itemAAtaqueArmaPorcentagem + 5; itemAAspdFixa = 1; }
  }

  function cocar() {
    imagemTopo = "https://i.imgur.com/DtJ2ceI.png";
    slotsTopo = 1;
    itemAForca = 1;
    itemAAgilidade = 1;
    itemADestreza = 1;
    itemASorte = 1;
    if(($("#cartaArco1").val() == "4255" || $("#cartaArco2").val() == "4255") && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "5")) { itemADanoRacial = 10; }
    if($("#cartaAcessorio1").val() == "4256" || $("#cartaAcessorio2").val() == "4256") { itemAAspdPorcentagem = 3; }
  }

  function malice() {
    imagemTopo = "https://i.imgur.com/AxAlrv2.png";
    slotsTopo = 1;
    itemADanoMVP = 30;
  }

  function cecila() {
    imagemTopo = "https://i.imgur.com/CaWKJFZ.png";
    slotsTopo = 1;
    itemADestreza = itemADestreza + 2;
    itemADanoDistancia = itemADanoDistancia + 10;
  }

  function ccacador() {
    imagemTopo = "https://i.imgur.com/oKBQDq5.png";
    slotsTopo = 1;
    itemADestreza = itemADestreza + 2;
    itemADanoCriticoPorcentagem = 10;
    if($("#itemFlecha").val() == "1764") {
      itemADanoCriticoPorcentagem += 5;
      if(parseInt($("#refinoItemTopo").val()) >= 7) { itemADanoCriticoPorcentagem += 5; }
    }
  }

  function ofelinas() {
    imagemTopo = "https://i.imgur.com/inLQ7wS.png";
    slotsTopo = 0;
    itemADanoCriticoPorcentagem += 10;
    itemATaxaCritico = 3;
    if($("#itemAcessorio1").val() == "2855" || $("#itemAcessorio2").val() == "2855") { itemADanoCriticoPorcentagem += 10; if(parseInt($("#refinoItemTopo").val()) >= 6) { itemATaxaCritico += 5; } }
  }

  function xogunato() {
    imagemTopo = "https://i.imgur.com/iqqXShv.png";
    slotsTopo = 1;
    itemAAtaque = parseInt(refinoTopo / 2) * 15;
    if(refinoTopo >= 7) { itemAAspdPorcentagem = 10; }
    if(refinoTopo >= 9) { itemAAtaqueArmaPorcentagem = itemAAtaqueArmaPorcentagem + 5; itemAAspdFixa = 1; }
    if(refinoTopo >= 11) { itemADanoCriticoPorcentagem = itemADanoCriticoPorcentagem + 15; }
  }

  function copas() {
    imagemTopo = "https://i.imgur.com/I1coani.png";
    slotsTopo = 1;
    itemADestreza = itemADestreza + 3;
    itemADanoDistancia = itemADanoDistancia + 4;
    if(parseInt($("#nivelPersonagem").val()) <= 129) { itemADestreza = itemADestreza + parseInt(refinoTopo / 2); } if(parseInt($("#nivelPersonagem").val()) > 129) { itemADestreza = itemADestreza + refinoTopo; }
    if($("#itemArco").val() == "1730" || $("#itemArco").val() == "1731" || $("#itemArco").val() == "1732" || $("#itemArco").val() == "1733") { itemADanoDistancia = itemADanoDistancia + 45; }
  }

  function emorrigane() {
    imagemTopo = "https://i.imgur.com/rLVuPLK.png";
    slotsTopo = 0;
    itemASorte = 2;
    itemAAtaque = 3;
    if($("#itemCapa").val() == "2519" && ($("#itemAcessorio1").val() == "2650" || $("#itemAcessorio2").val() == "2650") && ($("#itemAcessorio1").val() == "2651" || $("#itemAcessorio2").val() == "2651")) {
      itemAForca += 2;
      itemATaxaCritico += 13;
      itemASorte += 9;
      itemAAtaque += 18;
    }
  }

  function tapaoa() {
    imagemMeio = "https://i.imgur.com/ku2c0dr.png";
    slotsMeio = 1;
    if($("#cartaMeio").val() == "4143" || $("#cartaTopo").val() == "4143") {
      itemBAtaque = parseInt($("#vit").val() / 10) * 30;
      itemBSorte = parseInt($("#sor").val() / 10) * 3;
    }
  }

  function tapaob() {
    imagemMeio = "https://i.imgur.com/ku2c0dr.png";
    slotsMeio = 0;
    if($("#cartaMeio").val() == "4143" || $("#cartaTopo").val() == "4143") {
      itemBAtaque = parseInt($("#vit").val() / 10) * 30;
      itemBSorte = parseInt($("#sor").val() / 10) * 3;
    }
  }

  function marcas() {
    imagemMeio = "https://i.imgur.com/VlLLCRq.png";
    slotsMeio = 0;
    itemBDanoCriticoPorcentagem = 3;
    itemBDanoCriticoPorcentagem -= parseInt($("#des").val() / 10) * 2;
    itemBAtaque = parseInt($("#sor").val() / 10) * 2;
    itemBTaxaCritico = 3;
    itemBTaxaCritico += parseInt($("#sor").val() / 10);
    if(parseInt($("#sor").val()) >= 108) { itemBDanoCriticoPorcentagem += 10; itemBTaxaCritico += 5; }
    if(parseInt($("#sor").val()) >= 120) { itemBDanoCriticoPorcentagem += 17; itemBTaxaCritico += 10; }
  }

  function mtengua() {
    imagemMeio = "https://i.imgur.com/5bp3j0M.png";
    slotsMeio = 1;
    itemBDanoFisico = 1;
    itemBDanoDistancia = 2;
    if(parseInt($("#for").val()) >= 108) { itemBDanoFisico += 1; itemBDanoDistancia += 2; }
    if(parseInt($("#for").val()) >= 120) { itemBDanoFisico += 2; itemBDanoDistancia += 3; }
    if($("#itemBaixo").val() == "19112") {
      itemBDanoFisico += 1;
      itemBDanoDistancia += 1;
      if(parseInt($("#for").val()) >= 108) { itemBDanoFisico += 2; itemBDanoDistancia += 1; }
      if(parseInt($("#for").val()) >= 120) { itemBDanoFisico += 3; itemBDanoDistancia += 1; }
    }
  }

  function mtengub() {
    imagemMeio = "https://i.imgur.com/5bp3j0M.png";
    slotsMeio = 0;
    itemBDanoTamanho = 1;
    itemBDanoDistancia = 2;
    if(parseInt($("#for").val()) >= 108) { itemBDanoTamanho += 1; itemBDanoDistancia += 2; }
    if(parseInt($("#for").val()) >= 120) { itemBDanoTamanho += 2; itemBDanoDistancia += 3; }
    if($("#itemBaixo").val() == "19112") {
      itemBDanoTamanho += 1;
      itemBDanoDistancia += 1;
      if(parseInt($("#for").val()) >= 108) { itemBDanoTamanho += 2; itemBDanoDistancia += 1; }
      if(parseInt($("#for").val()) >= 120) { itemBDanoTamanho += 3; itemBDanoDistancia += 1; }
    }
  }

  function popstara() {
    imagemMeio = "https://i.imgur.com/6heCk1C.png";
    slotsMeio = 1;
  }

  function popstarb() {
    imagemMeio = "https://i.imgur.com/6heCk1C.png";
    slotsMeio = 0;
  }

  function venda() {
    imagemMeio = "https://i.imgur.com/ajuYxVh.png";
    slotsMeio = 0;
  }

  function serafim() {
    imagemMeio = "https://i.imgur.com/NJZnAj4.png";
    slotsMeio = 0;
    itemBAtaque = parseInt(parseInt($("#int").val()) / 8) * 5;
    if(parseInt($("#int").val()) >= 108) { itemBAtaque = itemBAtaque + 50; }
    if(parseInt($("#int").val()) >= 120) { itemBAtaque = itemBAtaque + 125; }
  }

  function grifo() {
    imagemMeio = "https://i.imgur.com/igqhUJn.png";
    slotsMeio = 0;
    itemBAspdPorcentagem = 1;
    if(parseInt($("#agi").val()) >= 108) { itemBAspdPorcentagem += 1; itemBAspdFixa = 1; }
  }

  function bionicos() {
    imagemMeio = "https://i.imgur.com/Cq6VblH.png";
    slotsMeio = 0;
    itemBDestreza = 1;
    itemBDanoFisico = 3;
  }

  function escuros() {
    imagemMeio = "https://i.imgur.com/e4rkMFR.png";
    slotsMeio = 1;
  }

  function pdesbravador() {
    imagemMeio = "https://i.imgur.com/49VA16o.png";
    slotsMeio = 0;
  }

  function ccomodo() {
    imagemBaixo = "https://i.imgur.com/r0LZcop.png";
    itemCDanoCriticoPorcentagem = 5;
    if($("#itemMeio").val() == "5918") {
      itemCDanoCriticoPorcentagem += 2;
      itemCDanoCriticoPorcentagem += parseInt($("#des").val() / 10) * 2;
      itemCAspdFixa = 1;
      if(parseInt($("#sor").val()) >= 108) { itemCDanoCriticoPorcentagem += 2; itemCAspdFixa += 1; }
      if(parseInt($("#sor").val()) >= 120) { itemCDanoCriticoPorcentagem += 4; itemCAspdFixa += 2; }
    }
  }

  function pombinho() {
    imagemBaixo = "https://i.imgur.com/mTDyCZP.png";
    itemCTaxaCritico = 5;
    itemCAspdPorcentagem = 5;
    if($("#itemMeio").val() == "19110a" || $("#itemMeio").val() == "19110b") {
      itemCAtaque = parseInt($("#sor").val() / 20) * 20;
    }
  }

  function familiar() {
    imagemBaixo = "https://i.imgur.com/KnqO2Co.png";
    itemCDanoRacial = 2;
  }

  function rosario() {
    imagemBaixo = "https://i.imgur.com/3x6wktn.png";
    itemCAspdFixa = 1;
    if($("#itemMeio").val() == "18823") {
      itemCAtaque = 10;
      itemCAspdPorcentagem = 3;
      if(parseInt($("#agi").val()) >= 108) {
        itemCAtaque = itemCAtaque + 20;
        itemCAspdPorcentagem += 5;
      }
      if(parseInt($("#agi").val()) >= 120) {
        itemCAtaque = itemCAtaque + 40;
        itemCAspdPorcentagem += 7;
      }
    }
  }

  function fadasa() {
    imagemBaixo = "https://i.imgur.com/vQgLDqh.png";
    itemCDanoCriticoPorcentagem = 3;
    itemCTaxaCritico = 9;
  }

  function fadasb() {
    imagemBaixo = "https://i.imgur.com/vQgLDqh.png";
    itemCDanoDistancia = 2;
    itemCDestreza = 1;
  }

  function infame() {
    imagemBaixo = "https://i.imgur.com/5BrMgvP.png";
    if($("#itemMeio").val() == "2202") {
      itemCTaxaCritico = parseInt((parseInt($("#for").val()) + parseInt($("#sor").val())) / 80) * 5;
      itemCDanoFisico = parseInt((parseInt($("#for").val()) + parseInt($("#sor").val())) / 80) * 6;
      itemCDanoCriticoPorcentagem = parseInt((parseInt($("#for").val()) + parseInt($("#sor").val())) / 80) * 10;
      itemCAspdPorcentagem = parseInt((parseInt($("#agi").val()) + parseInt($("#vit").val())) / 80) * 5;
    }
  }

  function pouring() {
    imagemBaixo = "https://i.imgur.com/6fkfBf9.png";
    itemCForca = 2;
    itemCAgilidade = 2;
    itemCDestreza = 2;
    itemCSorte = 2;
  }

  function halito() {
    imagemBaixo = "https://i.imgur.com/M8krEHz.png";
    if($("#itemCapa").val() == "20718a") {
      itemCDanoDistancia = parseInt($("#des").val() / 20);
      itemCDanoCriticoPorcentagem = parseInt($("#sor").val() / 20) * 3;
      itemCAspdPorcentagem = parseInt($("#agi").val() / 20) * 3;
    }
  }

  function fugitivo() {
    imagemBaixo = "https://i.imgur.com/0gi2oiY.png";
    itemCAtaque = 5;
  }

  function ptengu() {
    imagemBaixo = "https://i.imgur.com/XPn04d9.png";
  }

  function khalitzburg() {
    imagemArmadura = "https://i.imgur.com/sJnds93.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    var refinoArmadura = parseInt($("#refinoItemArmadura").val());
    if(refinoArmadura > 15) { refinoArmadura = 15; }
    itemDDanoDistancia = parseInt(refinoArmadura / 3) * 6;
  }

  function abissal() {
    imagemArmadura = "https://i.imgur.com/ZECpolH.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    if(parseInt($("#refinoItemArmadura").val()) >= 7) { if($("#racaMonstro").val() == "3" || $("#racaMonstro").val() == "7") itemDDanoRacial += 10; if(parseInt($("#propriedadeMonstro").val()) >= 60 && parseInt($("#propriedadeMonstro").val()) <= 73) itemDDanoPropriedade += 10; }
    if(parseInt($("#refinoItemArmadura").val()) >= 9) { if($("#racaMonstro").val() == "3" || $("#racaMonstro").val() == "7") itemDDanoRacial += 15; if(parseInt($("#propriedadeMonstro").val()) >= 60 && parseInt($("#propriedadeMonstro").val()) <= 73) itemDDanoPropriedade += 15; }
    if(parseInt($("#refinoItemArmadura").val()) >= 11) { if($("#racaMonstro").val() == "3" || $("#racaMonstro").val() == "7") itemDDanoRacial += 15; if(parseInt($("#propriedadeMonstro").val()) >= 60 && parseInt($("#propriedadeMonstro").val()) <= 73) itemDDanoPropriedade += 15; }
  }

  function robegraca() {
    imagemArmadura = "https://i.imgur.com/D643xSS.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAspdPorcentagem += parseInt($("#refinoItemArmadura").val());
    if(parseInt($("#refinoItemArmadura").val()) >= 7) { itemDDanoFisico = 10; }
    if(parseInt($("#refinoItemArmadura").val()) >= 9) { itemDDanoFisico = 20; }
    if($("#cartaArmadura").val() == "4419" && ($("#propriedadeMonstro").val() == "10" || $("#propriedadeMonstro").val() == "11" || $("#propriedadeMonstro").val() == "12" || $("#propriedadeMonstro").val() == "13")) { itemDDanoPropriedade = parseInt($("#refinoItemArmadura").val()) * 5; }
  }

  function eclipse() {
    imagemArmadura = "https://i.imgur.com/vLrwKkH.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    if($("#cartaArmadura").val() == "4324" && ($("#propriedadeMonstro").val() == "40" || $("#propriedadeMonstro").val() == "41" || $("#propriedadeMonstro").val() == "42" || $("#propriedadeMonstro").val() == "43")) { itemDDanoPropriedade = parseInt($("#refinoItemArmadura").val()) * 5; }
  }

  function afortunado() {
    imagemArmadura = "https://i.imgur.com/5yDR2ZP.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 50;
    itemDDanoCriticoPorcentagem = parseInt($("#refinoItemArmadura").val() / 3) * 2;
    if(parseInt($("#refinoItemArmadura").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 30;
    if(parseInt($("#refinoItemArmadura").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 10;
    if(parseInt($("#refinoItemArmadura").val()) >= 11 && (parseInt($("#propriedadeMonstro").val()) >= 20 && parseInt($("#propriedadeMonstro").val()) <= 33)) itemDDanoPropriedade += 10;
    if($("#itemSapatos").val() == "22005a") {
      itemDDanoCriticoPorcentagem += 10;
      if(parseInt($("#refinoItemArmadura").val()) + parseInt($("#refinoItemSapatos").val()) >= 21 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 20
    }
  }

  function astuto() {
    imagemArmadura = "https://i.imgur.com/yqORvyJ.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 50;
    itemDDanoDistancia = parseInt($("#refinoItemArmadura").val() / 3) * 2;
    if(parseInt($("#refinoItemArmadura").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 30;
    if(parseInt($("#refinoItemArmadura").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 10;
    if(parseInt($("#refinoItemArmadura").val()) >= 11 && (parseInt($("#propriedadeMonstro").val()) >= 20 && parseInt($("#propriedadeMonstro").val()) <= 33)) itemDDanoPropriedade += 10;
    if($("#itemSapatos").val() == "22004a") {
      itemDDanoDistancia += 5;
      if(parseInt($("#refinoItemArmadura").val()) + parseInt($("#refinoItemSapatos").val()) >= 21 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 20
    }
  }

  function agil() {
    imagemArmadura = "https://i.imgur.com/cDvAOA9.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 50;
    itemDAspdPorcentagem = parseInt($("#refinoItemArmadura").val() / 3) * 2;
    if(parseInt($("#refinoItemArmadura").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 30;
    if(parseInt($("#refinoItemArmadura").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 10;
    if(parseInt($("#refinoItemArmadura").val()) >= 11 && (parseInt($("#propriedadeMonstro").val()) >= 20 && parseInt($("#propriedadeMonstro").val()) <= 33)) itemDDanoPropriedade += 10;
    if($("#itemSapatos").val() == "22002a") {
      itemDAspdFixa += 1;
      if(parseInt($("#refinoItemArmadura").val()) + parseInt($("#refinoItemSapatos").val()) >= 21 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 20
    }
  }

  function robusto() {
    imagemArmadura = "https://i.imgur.com/f9guj3v.pngpng";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 50;
    itemDDanoRacial = parseInt($("#refinoItemArmadura").val() / 3) * 2;
    if(parseInt($("#refinoItemArmadura").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 30;
    if(parseInt($("#refinoItemArmadura").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 10;
    if(parseInt($("#refinoItemArmadura").val()) >= 11 && (parseInt($("#propriedadeMonstro").val()) >= 20 && parseInt($("#propriedadeMonstro").val()) <= 33)) itemDDanoPropriedade += 10;
    if($("#itemSapatos").val() == "22000a") {
      itemDAtaqueArmaPorcentagem += 10;
      if(parseInt($("#refinoItemArmadura").val()) + parseInt($("#refinoItemSapatos").val()) >= 21 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemDIgnorarDefesa += 20
    }
  }

  function vermelho() {
    imagemArmadura = "https://i.imgur.com/8pOV2Wf.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDForca = 1;
    itemDAgilidade = 1;
    itemDDestreza = 1;
    itemDSorte = 1;
    if(parseInt($("#refinoItemArmadura").val()) >= 6) { itemDDanoMVP = 10; }
    if(parseInt($("#refinoItemArmadura").val()) >= 11) { itemDDanoMVP = itemDDanoMVP + 10; }
  }

  function sstempo() {
    imagemArmadura = "https://i.imgur.com/yVqCibM.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 50;
  }

  function colete() {
    imagemArmadura = "https://i.imgur.com/5p3HJq7.png";
    slotsArmadura = 0;
    encantamentoArmadura = "exc";
    if(parseInt($("#itemCapa").val()) == 20773) { }
    if(parseInt($("#itemCapa").val()) == 20773 && parseInt($("#nivelPersonagem").val()) >= 130) { }
  }

  function senshi() {
    imagemArmadura = "https://i.imgur.com/YjWHLdU.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDAtaque = 10;
    itemDIgnorarDefesa = 10;
    if(parseInt($("#refinoItemArmadura").val()) == 7) { itemDAtaque = 30; itemDIgnorarDefesa = 30; }
    if(parseInt($("#refinoItemArmadura").val()) == 8) { itemDAtaque = 50; itemDIgnorarDefesa = 50; }
    if(parseInt($("#refinoItemArmadura").val()) >= 9) { itemDAtaque = 80; itemDIgnorarDefesa = 70; }
  }

  function vorags() {
    imagemArmadura = "https://i.imgur.com/IeMptmo.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDDanoDistancia = 2;
    if(parseInt($("#refinoItemArmadura").val()) == 8) { itemDDanoDistancia = 4; }
    if(parseInt($("#refinoItemArmadura").val()) >= 9) { itemDDanoDistancia = 7; }

    if(($("#itemArco").val() == "1730" && $("#itemFlecha").val() == "1752") ||
       ($("#itemArco").val() == "1731" && $("#itemFlecha").val() == "1754") ||
       ($("#itemArco").val() == "1732" && $("#itemFlecha").val() == "1756") ||
       ($("#itemArco").val() == "1733" && $("#itemFlecha").val() == "1755")) {
      itemDDanoDistancia = itemDDanoDistancia + 20;
      if(parseInt($("#refinoItemArco").val()) >= 10) { itemDAspdFixa = 1; }
    }
  }

  function ocultacaob() {
    imagemArmadura = "https://i.imgur.com/YVg16tF.png";
    slotsArmadura = 1;
    encantamentoArmadura = "nenhum";
    itemDDanoFisico = 10;
    itemDTaxaCritico = 20;
  }

  function demoniaco(selectAlterado) {
    imagemArco = "https://i.imgur.com/u3OhyOC.png";
    slotsArco = 2;
    encantamentoArco = "malang2";
    if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1767"); }
    if($("#itemFlecha").val() == "1767") { itemEDanoDistancia = 50; }
    itemEAtaque = 130 + (refinoItemArco * 7);
    if(parseInt($("#refinoItemArco").val()) >= 9) { itemEAspdFixa = 1; }
  }

  function rubi() {
    imagemArco = "https://i.imgur.com/1YZ30q6.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    refinoLimite = refinoItemArco;
    if(refinoLimite > 15) refinoLimite = 15;
    itemEAtaqueEquipamento = (refinoLimite * refinoLimite) + (parseInt((parseInt($("#nivelPersonagem").val()) - 70) / 10) * 5);
    itemEAtaque = 120 + (refinoItemArco * 5);
  }

  function aancestral() {
    imagemArco = "https://i.imgur.com/JkWjOiM.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    refinoArco = parseInt($("#refinoItemArco").val());
    itemEDanoDistancia = parseInt(refinoArco / 3) * 4;
    itemEAtaqueEquipamento = (parseInt(refinoArco / 2) * 10);
    itemEAtaque = 180 + (refinoItemArco * 7);
  }

  function aancestralb(selectAlterado) {
    imagemArco = "https://i.imgur.com/JkWjOiM.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    refinoArco = parseInt($("#refinoItemArco").val());
    itemEDanoDistancia = parseInt(refinoArco / 3) * 4 + 20;
    if(selectAlterado.is("#itemArco")) { $("#itemSapatos").val("22171"); }
    itemEDestreza = 20;
    itemEAtaqueEquipamento = (parseInt(refinoArco / 2) * 10);
    itemEAtaque = 180 + (refinoItemArco * 7);
  }

  function sobrenatural() {
    imagemArco = "https://i.imgur.com/yadTyrS.png";
    slotsArco = 1;
    encantamentoArco = "sobrenatural";
    refinoArco = parseInt($("#refinoItemArco").val());
    itemEAtaqueEquipamento = Math.min(refinoArco, 15) * Math.min(refinoArco, 15);
    itemEAtaque = 170 + (refinoItemArco * 7);
  }

  function bancestral() {
    imagemArco = "https://i.imgur.com/ImJGh9a.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    refinoArco = parseInt($("#refinoItemArco").val());
    if(refinoArco >= 9) {
      itemEAspdPorcentagem = 10;
    }
    if(refinoArco >= 11) {
      itemEDanoDistancia = 5;
    }
    itemEAtaqueEquipamento = (parseInt(refinoArco / 2) * 10);
    itemEAtaque = 180 + (refinoItemArco * 7);
  }

  function bancestralb(selectAlterado) {
    imagemArco = "https://i.imgur.com/ImJGh9a.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    if(selectAlterado.is("#itemArco")) { $("#itemSapatos").val("22171"); }
    itemEDestreza = 20;
    itemEDanoDistancia = 20;
    refinoArco = parseInt($("#refinoItemArco").val());
    if(refinoArco >= 9) {
      itemEAspdPorcentagem = 10;
    }
    if(refinoArco >= 11) {
      itemEDanoDistancia += 5;
    }
    itemEAtaqueEquipamento = (parseInt(refinoArco / 2) * 10);
    itemEAtaque = 180 + (refinoItemArco * 7);
  }

  function orc(selectAlterado) {
    imagemArco = "https://i.imgur.com/AQ4RePT.png";
    slotsArco = 1;
    encantamentoArco = "nenhum";
    if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1753"); }
    if($("#itemFlecha").val() == "1753") { itemEDanoDistancia = 50; }
    itemEAtaque = 120 + (refinoItemArco * 5);
  }

  function catapulta() {
    imagemArco = "https://i.imgur.com/mKFlzcD.png";
    slotsArco = 2;
    encantamentoArco = "catapa";
    itemEAtaque = 150 + (refinoItemArco * 7);
  }

  function elementais(elemental, selectAlterado) {
    if(elemental == "1730") { imagemArco = "https://i.imgur.com/yCMeRCn.png"; if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1752"); } if($("#itemFlecha").val() == "1752") { itemEDanoDistancia = 25; } }
    if(elemental == "1731") { imagemArco = "https://i.imgur.com/Rg3odWT.png"; if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1754"); } if($("#itemFlecha").val() == "1754") { itemEDanoDistancia = 25; } }
    if(elemental == "1732") { imagemArco = "https://i.imgur.com/OozTBB5.png"; if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1756"); } if($("#itemFlecha").val() == "1756") { itemEDanoDistancia = 25; } }
    if(elemental == "1733") { imagemArco = "https://i.imgur.com/weiirpG.png"; if(selectAlterado.is("#itemArco")) { $("#itemFlecha").val("1755"); } if($("#itemFlecha").val() == "1755") { itemEDanoDistancia = 25; } }
    slotsArco = 1;
    encantamentoArco = "nenhum";
    itemEAtaque = 95 + (refinoItemArco * 5);
  }

  function gakkung() {
    imagemArco = "https://i.imgur.com/zqeq5W1.png";
    slotsArco = 2;
    encantamentoArco = "nenhum";
    itemEAtaque = 100 + (refinoItemArco * 5);
  }

  function escudogaia() {
    imagemEscudo = "https://i.imgur.com/FRYRfZl.png";
    itemJAtaque = 150;
  }

  function escudoredondo() {
    imagemEscudo = "https://i.imgur.com/0tA32zr.png";
    itemJAtaque = 90;
  }

  function egiderealeza() {
    imagemEscudo = "https://i.imgur.com/SttvTlI.png";
    itemJAtaque = 30;
  }

  function mantofen() {
    imagemCapa = "https://i.imgur.com/j0xN8HK.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    if(parseInt($("#propriedadeMonstro").val()) >= 10 && parseInt($("#propriedadeMonstro").val()) <= 13) {
      itemFDanoFisico += 15 + parseInt($("#refinoItemCapa").val());
      itemFAspdPorcentagem += parseInt($("#refinoItemCapa").val());
    }
  }

  function mantolev() {
    imagemCapa = "https://i.imgur.com/lirGluW.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    if(parseInt($("#propriedadeMonstro").val()) >= 40 && parseInt($("#propriedadeMonstro").val()) <= 43) {
      itemFDanoFisico += 15 + parseInt($("#refinoItemCapa").val());
      itemFAspdPorcentagem += parseInt($("#refinoItemCapa").val());
    }
  }

  function mantoagi() {
    imagemCapa = "https://i.imgur.com/4R3qvac.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    itemFAtaque = parseInt($("#refinoItemCapa").val() / 2) * 10;
    itemFDanoCriticoPorcentagem = parseInt($("#refinoItemCapa").val() / 2) * 3;
    itemFDanoTamanho = parseInt($("#refinoItemCapa").val() / 4) * 5;
    if(parseInt($("#refinoItemCapa").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 20;
    if(parseInt($("#refinoItemCapa").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 10;
    if(parseInt($("#refinoItemCapa").val()) >= 7) { itemFAtaqueArmaPorcentagem = 7; }
    if($("#itemSapatos").val() == "22002a") {
      itemFDanoCriticoPorcentagem += 7;
      if(parseInt($("#refinoItemSapatos").val()) >= 10 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 30;
    }
  }

  function mantodes() {
    imagemCapa = "https://i.imgur.com/4R3qvac.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    itemFAtaque = parseInt($("#refinoItemCapa").val() / 2) * 10;
    itemFDanoDistancia = parseInt($("#refinoItemCapa").val() / 2);
    itemFDanoCriticoPorcentagem = parseInt($("#refinoItemCapa").val() / 4) * 3;
    if(parseInt($("#refinoItemCapa").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 20;
    if(parseInt($("#refinoItemCapa").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 10;
    if(parseInt($("#refinoItemCapa").val()) >= 7) { itemFAtaqueArmaPorcentagem = 7; }
    if($("#itemSapatos").val() == "22004a") {
      itemFDanoDistancia += 7;
      if(parseInt($("#refinoItemSapatos").val()) >= 10 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 30;
    }
  }

  function mantofor() {
    imagemCapa = "https://i.imgur.com/4R3qvac.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    itemFAtaque = parseInt($("#refinoItemCapa").val() / 2) * 10;
    itemFAtaqueArmaPorcentagem = parseInt($("#refinoItemCapa").val() / 2);
    itemFDanoTamanho = parseInt($("#refinoItemCapa").val() / 4) * 5;
    if(parseInt($("#refinoItemCapa").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 20;
    if(parseInt($("#refinoItemCapa").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 10;
    if(parseInt($("#refinoItemCapa").val()) >= 7) { itemFAtaqueArmaPorcentagem += 7; }
    if($("#itemSapatos").val() == "22000a") {
      itemFAtaque += 50;
      if(parseInt($("#refinoItemSapatos").val()) >= 10 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 30;
    }
  }

  function mantosor() {
    imagemCapa = "https://i.imgur.com/4R3qvac.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    itemFTaxaCritico = parseInt($("#refinoItemCapa").val() / 2) * 3;
    itemFDanoCriticoPorcentagem = parseInt($("#refinoItemCapa").val() / 2) * 3;
    itemFAspdPorcentagem = parseInt($("#refinoItemCapa").val() / 4) * 5;
    if(parseInt($("#refinoItemCapa").val()) >= 7 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 20;
    if(parseInt($("#refinoItemCapa").val()) >= 9 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 10;
    if(parseInt($("#refinoItemCapa").val()) >= 7) { itemFAtaqueArmaPorcentagem = 7; }
    if($("#itemSapatos").val() == "22005a") {
      itemFAspdFixa = 1;
      if(parseInt($("#refinoItemSapatos").val()) >= 10 && ($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "3")) itemFIgnorarDefesa += 30;
    }
  }

  function arcanjo() {
    imagemCapa = "https://i.imgur.com/5CBTBzA.png";
    slotsCapa = 1;
    encantamentoCapa = "faw";
    itemFForca = 1;
    itemFAgilidade = 1;
    itemFDestreza = 1;
    itemFSorte = 1;
    itemFAtaque = parseInt($("#for").val() / 20);
    itemFAspdPorcentagem = parseInt($("#agi").val() / 20);
    itemFDanoDistancia = parseInt($("#des").val() / 20);
    itemFDanoCriticoPorcentagem = parseInt($("#sor").val() / 20);
    if(parseInt($("#refinoItemCapa").val()) < 9) { $("#refinoItemCapa").val("9"); }
  }

  function motor() {
    imagemCapa = "https://i.imgur.com/dshD7zb.png";
    slotsCapa = 0;
    encantamentoCapa = "exc";
  }

  function mochila() {
    imagemCapa = "https://i.imgur.com/DEzQcvV.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    if(parseInt($("#refinoItemCapa").val()) >= 7 && parseInt($("#for").val()) >= 90) { itemFAtaque = 20; }
    if(parseInt($("#refinoItemCapa").val()) >= 7 && parseInt($("#agi").val()) >= 90) { itemFAspdPorcentagem = 8; }
    if(parseInt($("#refinoItemCapa").val()) >= 7 && parseInt($("#des").val()) >= 90) { itemFDanoDistancia = 5; }
    if(parseInt($("#refinoItemCapa").val()) >= 7 && parseInt($("#sor").val()) >= 90) { itemFDanoCriticoPorcentagem = 10; }
    if(parseInt($("#refinoItemCapa").val()) >= 9 && parseInt($("#for").val()) >= 90) { itemFAtaque = 30; }
    if(parseInt($("#refinoItemCapa").val()) >= 9 && parseInt($("#agi").val()) >= 90) { itemFAspdFixa = 1; }
    if(parseInt($("#refinoItemCapa").val()) >= 9 && parseInt($("#des").val()) >= 90) { itemFDanoDistancia = 10; }
    if(parseInt($("#refinoItemCapa").val()) >= 9 && parseInt($("#sor").val()) >= 90) { itemFDanoCriticoPorcentagem = 15; }
  }

  function mstempo() {
    imagemCapa = "https://i.imgur.com/i9hil1r.png";
    slotsCapa = 1;
    itemFAspdPorcentagem = 10;
  }

  function mmorrigane() {
    imagemCapa = "https://i.imgur.com/GML9aTe.png";
    slotsCapa = 0;
    itemFSorte = 2;
  }

  function mochileiro() {
    imagemCapa = "https://i.imgur.com/OO6u84L.png";
    slotsCapa = 1;
    itemFDanoDistancia = 2;
    if(parseInt($("#refinoItemCapa").val()) == 8) { itemFDanoDistancia = 4; }
    if(parseInt($("#refinoItemCapa").val()) >= 9) { itemFDanoDistancia = 7; }
    if(($("#itemArco").val() == "1730" && $("#itemFlecha").val() == "1752" && parseInt($("#refinoItemArco").val()) >= 10) ||
       ($("#itemArco").val() == "1731" && $("#itemFlecha").val() == "1754" && parseInt($("#refinoItemArco").val()) >= 10) ||
       ($("#itemArco").val() == "1732" && $("#itemFlecha").val() == "1756" && parseInt($("#refinoItemArco").val()) >= 10) ||
       ($("#itemArco").val() == "1733" && $("#itemFlecha").val() == "1755" && parseInt($("#refinoItemArco").val()) >= 10)) {
      itemFAspdFixa = 1;
    }
  }

  function vermea() {
    imagemCapa = "https://i.imgur.com/6q7PtMK.png";
    slotsCapa = 1;
    encantamentoCapa = "nenhum";
    itemFDestreza = 9;
    if(parseInt($("#refinoItemCapa").val()) >= 8) { itemFDestreza = 12; }
  }

  function temporaissor(slot) {
    imagemSapatos = "https://i.imgur.com/QQEY5Dg.png";
    slotsSapatos = slot;
    encantamentoSapatos = "encantamentosBotasTemporais";
    itemGDanoCriticoPorcentagem = parseInt(parseInt($("#refinoItemSapatos").val()) / 3) * 2;
    if(parseInt($("#sor").val()) >= 120) { itemGDanoCriticoPorcentagem = itemGDanoCriticoPorcentagem + 30; }
  }

  function temporaisdes(slot) {
    imagemSapatos = "https://i.imgur.com/CqvR7To.png";
    slotsSapatos = slot;
    encantamentoSapatos = "encantamentosBotasTemporais";
    itemGDestreza = parseInt(parseInt($("#refinoItemSapatos").val()) / 3) * 3;
    if(parseInt($("#des").val()) >= 120) { itemGDanoDistancia = 5; }
  }

  function temporaisagi(slot) {
    imagemSapatos = "https://i.imgur.com/8S8zDB4.png";
    slotsSapatos = slot;
    encantamentoSapatos = "encantamentosBotasTemporais";
    itemGAspdPorcentagem = parseInt(parseInt($("#refinoItemSapatos").val()) / 3) * 3;
    if(parseInt($("#agi").val()) >= 120) { itemGAspdFixa = 1; }
  }

  function temporaisfor(slot) {
    imagemSapatos = "https://i.imgur.com/hUoeONp.png";
    slotsSapatos = slot;
    encantamentoSapatos = "encantamentosBotasTemporais";
    itemGAtaque = parseInt(parseInt($("#refinoItemSapatos").val()) / 3) * 7;
    if(parseInt($("#for").val()) >= 120) { itemGAtaque += 50; }
  }

  function saltoelegante(selectAlterado) {
    imagemSapatos = "https://i.imgur.com/ESRnQW7.png";
    slotsSapatos = 1;
    encantamentoSapatos = "nenhum";
    if(selectAlterado.is("#itemSapatos")) { $("#cartaSapatos").val("4236"); }
    if($("#cartaSapatos").val() == "4236") {
      itemGForca = parseInt($("#refinoItemSapatos").val()) * 3;
      itemGAgilidade = parseInt($("#refinoItemSapatos").val()) * 3;
      itemGDestreza = parseInt($("#refinoItemSapatos").val()) * 3;
      itemGSorte = parseInt($("#refinoItemSapatos").val()) * 3;
    }
  }

  function inteligentes() {
    imagemSapatos = "https://i.imgur.com/9jdCQtr.png";
    slotsSapatos = 1;
    encantamentoSapatos = "nenhum";
    if(parseInt($("#sor").val()) >= 125 && parseInt($("#refinoItemSapatos").val()) >= 8) { itemGDanoCriticoPorcentagem = 20; }
    if(parseInt($("#sor").val()) >= 125 && parseInt($("#refinoItemSapatos").val()) >= 12) { itemGDanoCriticoPorcentagem = itemGDanoCriticoPorcentagem + 20; }
    if(parseInt($("#for").val()) >= 125 && parseInt($("#refinoItemSapatos").val()) >= 8) { itemGAtaque = 90; }
    if(parseInt($("#for").val()) >= 125 && parseInt($("#refinoItemSapatos").val()) >= 12) { itemGAtaque = itemGAtaque + 90; }
  }

  function sluxuosos() {
    imagemSapatos = "https://i.imgur.com/4VTGAsT.png";
    slotsSapatos = 1;
    encantamentoSapatos = "nenhum";
    if(($("#propriedadeMonstro").val() == "00" || $("#propriedadeMonstro").val() == "01" || $("#propriedadeMonstro").val() == "02" || $("#propriedadeMonstro").val() == "03") ||
       (parseInt($("#propriedadeMonstro").val()) >= 10 && parseInt($("#propriedadeMonstro").val()) <= 43)) {
      if(parseInt($("#refinoItemSapatos").val()) >= 5) itemGDanoFisico += 5;
      if(parseInt($("#refinoItemSapatos").val()) >= 7) itemGDanoFisico += 10;
    }
  }

  function aladas() {
    imagemSapatos = "https://i.imgur.com/LgjGW9J.png";
    slotsSapatos = 0;
    encantamentoSapatos = "nenhum";
    itemGDanoDistancia = 2;
    itemGDanoCriticoPorcentagem = 2;
    if(parseInt($("#refinoItemSapatos").val()) >= 5) { itemGDanoDistancia = 5; itemGDanoCriticoPorcentagem = 5; }
    if(parseInt($("#refinoItemSapatos").val()) >= 7) { itemGDanoDistancia = 10; itemGDanoCriticoPorcentagem = 10; }
  }

  function bancestrais() {
    imagemSapatos = "https://i.imgur.com/ZI3nA12.png";
    slotsSapatos = 1;
    encantamentoSapatos = "nenhum";
  }

  function bstempo() {
    imagemSapatos = "https://i.imgur.com/PJTJUsB.png";
    slotsSapatos = 1;
    encantamentoSapatos = "nenhum";
    itemGTaxaCritico = 10;
    itemGDanoCriticoPorcentagem = 10;
    if($("#itemArmadura").val() == "15383") { itemGAtaqueArmaPorcentagem = 5; }
  }

  function svelozes() {
    imagemSapatos = "https://i.imgur.com/uSjzlks.png";
    slotsSapatos = 0;
    encantamentoSapatos = "nenhum";
    itemGAgilidade = 1;
    itemGAspdPorcentagem = 3;
  }

  function grilhoes() {
    imagemSapatos = "https://i.imgur.com/aj9womM.png";
    slotsSapatos = 0;
    encantamentoSapatos = "nenhum";
  }

  function apresidiario(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/6EyaVpZ.png";
      slotsAcessorio1 = 1;
      itemHAtaque = 10;
      if($("#itemSapatos").val() == "2408") { itemHAtaque += Math.min(10, parseInt($("#refinoItemSapatos").val())); }
      if($("#itemMeio").val() == "2295") { itemHAtaque += 10; }
      if($("#itemAcessorio2").val() == "2655") { itemHAtaque += 10; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/6EyaVpZ.png";
      slotsAcessorio2 = 1;
      itemIAtaque = 10;
      if($("#itemAcessorio1").val() != "2913") {
        if($("#itemSapatos").val() == "2408") { itemIAtaque += Math.min(10, parseInt($("#refinoItemSapatos").val())); }
        if($("#itemMeio").val() == "2295") { itemIAtaque += 10; }
      }
      if($("#itemAcessorio1").val() == "2655") { itemIAtaque += 10; }
    }
  }

  function cpetal(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/e89MbjU.png";
      slotsAcessorio1 = 1;
      itemHDanoCriticoPorcentagem = 5;
      itemHDanoMVP = 5;
      itemHAspdFixa = 1;
      itemHTaxaCritico = 5;
      if($("#itemTopo").val() == "19316" || $("#itemTopo").val() == "19316a") {
        if(parseInt($("#refinoItemTopo").val()) >= 6) {
          itemHDanoCriticoPorcentagem = 15;
          itemHDanoMVP = 15;
          itemHAspdFixa = 2;
          itemHTaxaCritico += 10;
        }
        if(parseInt($("#refinoItemTopo").val()) >= 8) {
          itemHDanoCriticoPorcentagem = 30;
          itemHDanoMVP = 30;
          itemHAspdFixa = 3;
          itemHTaxaCritico += 15;
        }
      }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/e89MbjU.png";
      slotsAcessorio2 = 1;
      itemIDanoCriticoPorcentagem = 5;
      itemIDanoMVP = 5;
      itemIAspdFixa = 1;
      itemITaxaCritico = 5;
      if($("#itemTopo").val() == "19316" || $("#itemTopo").val() == "19316a") {
        if($("#itemAcessorio1").val() != "490031") {
          if(parseInt($("#refinoItemTopo").val()) >= 6) {
            itemIDanoCriticoPorcentagem = 15;
            itemIDanoMVP = 15;
            itemIAspdFixa = 2;
            itemITaxaCritico += 10;
          }
          if(parseInt($("#refinoItemTopo").val()) >= 8) {
            itemIDanoCriticoPorcentagem = 30;
            itemIDanoMVP = 30;
            itemIAspdFixa = 3;
            itemITaxaCritico += 15;
          }
        }
      }
    }
  }

  function ckirin(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/Kd25UwJ.png";
      slotsAcessorio1 = 1;
      itemHAgilidade = 2;
      itemHAspdPorcentagem = 2;
      if(parseInt($("#agi").val()) >= 100) itemHAspdPorcentagem += 5;
      if($("#faw-e1").val() == "faw-e1-aa1" || $("#faw-e2").val() == "faw-e2-aa1" || $("#faw-e3").val() == "faw-e3-aa1") itemHAspdFixa += 1;
      if($("#faw-e1").val() == "faw-e1-aa2" || $("#faw-e2").val() == "faw-e2-aa2" || $("#faw-e3").val() == "faw-e3-aa2") itemHAspdFixa += 1;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/Kd25UwJ.png";
      slotsAcessorio2 = 1;
      itemIAgilidade = 2;
      itemIAspdPorcentagem = 2;
      if(parseInt($("#agi").val()) >= 100) itemIAspdPorcentagem += 5;
      if($("#itemAcessorio1").val() != "28501") {
        if($("#faw-e1").val() == "faw-e1-aa1" || $("#faw-e2").val() == "faw-e2-aa1" || $("#faw-e3").val() == "faw-e3-aa1") itemIAspdFixa += 1;
        if($("#faw-e1").val() == "faw-e1-aa2" || $("#faw-e2").val() == "faw-e2-aa2" || $("#faw-e3").val() == "faw-e3-aa2") itemIAspdFixa += 1;
      }
    }
  }

  function cmorrigane(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/9lTIYxB.png";
      slotsAcessorio1 = 0;
      itemHAtaque = 5;
      itemHTaxaCritico = 3;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/9lTIYxB.png";
      slotsAcessorio2 = 0;
      itemIAtaque = 5;
      itemITaxaCritico = 3;
    }
  }

  function pmorrigane(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/8UxsH8S.png";
      slotsAcessorio1 = 0;
      itemHForca = 2;
      itemHTaxaCritico = 3;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/8UxsH8S.png";
      slotsAcessorio2 = 0;
      itemIForca = 2;
      itemITaxaCritico = 3;
    }
  }

  function moni(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/jzAXTTP.png";
      slotsAcessorio1 = 1;
      itemHSorte = parseInt($("#agi").val() / 18) * 3;
      itemHDestreza = parseInt($("#vit").val() / 18) * 3;
      itemHForca = parseInt($("#int").val() / 18) * 3;
      itemHAgilidade = parseInt($("#sor").val() / 18) * 3;
      itemHIgnorarDefesa = parseInt($("#sor").val() / 18) * 15;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/jzAXTTP.png";
      slotsAcessorio2 = 1;
      itemISorte = parseInt($("#agi").val() / 18) * 3;
      itemIDestreza = parseInt($("#vit").val() / 18) * 3;
      itemIForca = parseInt($("#int").val() / 18) * 3;
      itemIAgilidade = parseInt($("#sor").val() / 18) * 3;
      itemIIgnorarDefesa = parseInt($("#sor").val() / 18) * 15;
    }
  }

  function aesmeralda(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/wgmJ00i.png";
      slotsAcessorio1 = 1;
      itemHAtaque = 50;
      itemHAgilidade = 5;
      itemHDestreza = 5;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/wgmJ00i.png";
      slotsAcessorio2 = 1;
      itemIAtaque = 50;
      itemIAgilidade = 5;
      itemIDestreza = 5;
    }
  }

  function acapiroto(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/8enL9n6.png";
      slotsAcessorio1 = 1;
      itemHAtaqueArmaPorcentagem = 5;
      if($("#cartaAcessorio1").val() == "4908" || $("#cartaAcessorio2").val() == "4908" || $("#cartaTopo").val() == "4908" || $("#cartaSapatos").val() == "4908") { itemHAtaqueArmaPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4909" || $("#cartaAcessorio2").val() == "4909" || $("#cartaTopo").val() == "4909" || $("#cartaSapatos").val() == "4909") { itemHAtaqueArmaPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4910" || $("#cartaAcessorio2").val() == "4910" || $("#cartaTopo").val() == "4910" || $("#cartaSapatos").val() == "4910") { itemHAtaqueArmaPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4914" || $("#cartaAcessorio2").val() == "4914" || $("#cartaTopo").val() == "4914" || $("#cartaSapatos").val() == "4914") { itemHAspdPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4915" || $("#cartaAcessorio2").val() == "4915" || $("#cartaTopo").val() == "4915" || $("#cartaSapatos").val() == "4915") { itemHAspdPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4916" || $("#cartaAcessorio2").val() == "4916" || $("#cartaTopo").val() == "4916" || $("#cartaSapatos").val() == "4916") { itemHAspdPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4923" || $("#cartaAcessorio2").val() == "4923" || $("#cartaTopo").val() == "4923" || $("#cartaSapatos").val() == "4923") { itemHDanoCriticoPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4924" || $("#cartaAcessorio2").val() == "4924" || $("#cartaTopo").val() == "4924" || $("#cartaSapatos").val() == "4924") { itemHDanoCriticoPorcentagem += 5; }
      if($("#cartaAcessorio1").val() == "4925" || $("#cartaAcessorio2").val() == "4925" || $("#cartaTopo").val() == "4925" || $("#cartaSapatos").val() == "4925") { itemHDanoCriticoPorcentagem += 5; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/8enL9n6.png";
      slotsAcessorio2 = 1;
      itemIAtaqueArmaPorcentagem = 5;
      if($("#itemAcessorio1").val() != "28505") {
        if($("#cartaAcessorio1").val() == "4908" || $("#cartaAcessorio2").val() == "4908" || $("#cartaTopo").val() == "4908" || $("#cartaSapatos").val() == "4908") { itemIAtaqueArmaPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4909" || $("#cartaAcessorio2").val() == "4909" || $("#cartaTopo").val() == "4909" || $("#cartaSapatos").val() == "4909") { itemIAtaqueArmaPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4910" || $("#cartaAcessorio2").val() == "4910" || $("#cartaTopo").val() == "4910" || $("#cartaSapatos").val() == "4910") { itemIAtaqueArmaPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4914" || $("#cartaAcessorio2").val() == "4914" || $("#cartaTopo").val() == "4914" || $("#cartaSapatos").val() == "4914") { itemIAspdPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4915" || $("#cartaAcessorio2").val() == "4915" || $("#cartaTopo").val() == "4915" || $("#cartaSapatos").val() == "4915") { itemIAspdPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4916" || $("#cartaAcessorio2").val() == "4916" || $("#cartaTopo").val() == "4916" || $("#cartaSapatos").val() == "4916") { itemIAspdPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4923" || $("#cartaAcessorio2").val() == "4923" || $("#cartaTopo").val() == "4923" || $("#cartaSapatos").val() == "4923") { itemIDanoCriticoPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4924" || $("#cartaAcessorio2").val() == "4924" || $("#cartaTopo").val() == "4924" || $("#cartaSapatos").val() == "4924") { itemIDanoCriticoPorcentagem += 5; }
        if($("#cartaAcessorio1").val() == "4925" || $("#cartaAcessorio2").val() == "4925" || $("#cartaTopo").val() == "4925" || $("#cartaSapatos").val() == "4925") { itemIDanoCriticoPorcentagem += 5; }
      }
    }
  }

  function adesbravador(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/ySyav4J.png";
      slotsAcessorio1 = 1;
      itemHAspdFixa = 1;
      if($("#itemMeio").val() == "19393") { itemHAtaque = 30; itemHDanoMVP = 20; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/ySyav4J.png";
      slotsAcessorio2 = 1;
      itemIAspdFixa = 1;
      if($("#itemMeio").val() == "19393" && $("#itemAcessorio1").val() != "32243") { itemIAtaque = 30; itemIDanoMVP = 20; }
    }
  }

  function fada(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/w2xDodr.png";
      slotsAcessorio1 = 1;
      itemHDestreza = 2;
      itemHDanoDistancia = 2;
      if(parseInt($("#des").val()) >= 100) { itemHDanoDistancia += 5; }
      if($("#faw-e1").val() == "faw-e1-ma1" || $("#faw-e2").val() == "faw-e2-ma1" || $("#faw-e3").val() == "faw-e3-ma1" || $("#catapa-e1").val() == "catapa-e1-ma1" || $("#catapa-e2").val() == "catapa-e2-ma1" || $("#itemBaixo").val() == "19305b") {
        itemHDanoDistancia += 5;
      }
      if($("#faw-e1").val() == "faw-e1-ma2" || $("#faw-e2").val() == "faw-e2-ma2" || $("#faw-e3").val() == "faw-e3-ma2" || $("#catapa-e1").val() == "catapa-e1-ma2" || $("#catapa-e2").val() == "catapa-e2-ma2") {
        itemHDanoDistancia += 5;
      }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/w2xDodr.png";
      slotsAcessorio2 = 1;
      itemIDestreza = 2;
      itemIDanoDistancia = 2;
      if(parseInt($("#des").val()) >= 100) { itemIDanoDistancia += 5; }
      if($("#itemAcessorio1").val() != "28438") {
        if($("#faw-e1").val() == "faw-e1-ma1" || $("#faw-e2").val() == "faw-e2-ma1" || $("#faw-e3").val() == "faw-e3-ma1" || $("#catapa-e1").val() == "catapa-e1-ma1" || $("#catapa-e2").val() == "catapa-e2-ma1" || $("#itemBaixo").val() == "19305b") {
          itemIDanoDistancia += 5;
        }
        if($("#faw-e1").val() == "faw-e1-ma2" || $("#faw-e2").val() == "faw-e2-ma2" || $("#faw-e3").val() == "faw-e3-ma2" || $("#catapa-e1").val() == "catapa-e1-ma2" || $("#catapa-e2").val() == "catapa-e2-ma2") {
          itemIDanoDistancia += 5;
        }
      }
    }
  }

  function pgigante(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/x3VAI6d.png";
      slotsAcessorio1 = 1;
      itemHAtaqueArmaPorcentagem = 5;
      if(parseInt($("#for").val()) >= 120) { itemHAtaque += 50; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/x3VAI6d.png";
      slotsAcessorio2 = 1;
      itemIAtaqueArmaPorcentagem = 5;
      if(parseInt($("#for").val()) >= 120) { itemIAtaque += 50; }
    }
  }

  function cristalazul(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/w3OEp5Z.png";
      slotsAcessorio1 = 1;
      itemHDanoCriticoPorcentagem = 2;
      if(parseInt($("#sor").val()) >= 100) { itemHDanoCriticoPorcentagem = 12; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/w3OEp5Z.png";
      slotsAcessorio2 = 1;
      itemIDanoCriticoPorcentagem = 2;
      if(parseInt($("#sor").val()) >= 100) { itemIDanoCriticoPorcentagem = 12; }
    }
  }

  function esmeralda(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/7GUM7xO.png";
      itemHAgilidade = 5;
      itemHDestreza = 5;
      slotsAcessorio1 = 1;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/7GUM7xO.png";
      itemIAgilidade = 5;
      itemIDestreza = 5;
      slotsAcessorio2 = 1;
    }
  }

  function diario(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/HexWakw.png";
      itemHForca = 10;
      itemHAgilidade = 10;
      slotsAcessorio1 = 1;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/HexWakw.png";
      itemIForca = 10;
      itemIAgilidade = 10;
      slotsAcessorio2 = 1;
    }
  }

  function lvigor(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/6bk46dI.png";
      itemHDanoMVP = 5;
      itemHIgnorarDefesa = 20;
      slotsAcessorio1 = 1;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/6bk46dI.png";
      itemIDanoMVP = 5;
      itemIIgnorarDefesa = 20;
      slotsAcessorio2 = 1;
    }
  }

  function matagi(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/MxF2SxP.png";
      slotsAcessorio1 = 1;
      itemHSorte = 2;
      itemHTaxaCritico = 5;
      if(parseInt($("#sor").val()) >= 100) { itemHTaxaCritico += 10; }
      if($("#itemBaixo").val() == "19305a") { itemHTaxaCritico += 20; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/MxF2SxP.png";
      slotsAcessorio2 = 1;
      itemISorte = 2;
      itemITaxaCritico = 5;
      if(parseInt($("#sor").val()) >= 100) { itemITaxaCritico += 10; }
      if($("#itemBaixo").val() == "19305a" && $("#itemAcessorio1") != "28491") { itemITaxaCritico += 20; }
    }
  }

  function astempo(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/u9SlViV.png";
      slotsAcessorio1 = 1;
      itemHAspdPorcentagem = 10;
      if($("#itemArmadura").val() == "15383" && $("#itemCapa").val() == "20939" && $("#itemSapatos").val() == "22204") { itemHAspdFixa += 2; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/u9SlViV.png";
      slotsAcessorio2 = 1;
      itemIAspdPorcentagem = 10;
      if($("#itemArmadura").val() == "15383" && $("#itemCapa").val() == "20939" && $("#itemSapatos").val() == "22204" && $("#itemAcessorio1").val() != "32221") { itemIAspdFixa += 2; }
    }
  }

  function adraco(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/Qi5YAG9.png";
      slotsAcessorio1 = 1;
      itemHAspdPorcentagem = 10;
      if(parseInt($("#for").val()) >= 120) { itemHAtaque += 50; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/Qi5YAG9.png";
      slotsAcessorio2 = 1;
      itemIAspdPorcentagem = 10;
      if(parseInt($("#for").val()) >= 120) { itemIAtaque += 50; }
    }
  }

  function bferro(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/jcXop1Y.png";
      slotsAcessorio1 = 0;
      if($("#itemSapatos").val() == "2408") { itemHAtaque = 50; }
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/jcXop1Y.png";
      slotsAcessorio2 = 0;
      if($("#itemSapatos").val() == "2408" && $("#itemAcessorio1").val() != "2655") { itemIAtaque = 50; }
    }
  }

  function rabogp(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/8BIfxTV.png";
      slotsAcessorio1 = 0;
      itemHTaxaCritico = 7;
      itemHAspdPorcentagem = 3;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/8BIfxTV.png";
      slotsAcessorio2 = 0;
      itemITaxaCritico = 7;
      itemIAspdPorcentagem = 3;
    }
  }

  function lsorte(acessorio, slots) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/bdvRgV1.png";
      slotsAcessorio1 = slots;
      itemHTaxaCritico = parseInt(parseInt($("#sor").val()) / 10);
      if(parseInt($("#sor").val()) >= 110) itemHDanoCriticoPorcentagem = 1;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/bdvRgV1.png";
      slotsAcessorio2 = slots;
      itemITaxaCritico = parseInt(parseInt($("#sor").val()) / 10);
      if(parseInt($("#sor").val()) >= 110) itemIDanoCriticoPorcentagem = 1;
    }
  }

  function bakonawa(acessorio) {
    if(acessorio == "acessorio1") {
      imagemAcessorio1 = "https://i.imgur.com/PlD9H6E.png";
      slotsAcessorio1 = 0;
      itemHDanoFisico = 7;
      itemHAspdPorcentagem = 10;
    }
    if(acessorio == "acessorio2") {
      imagemAcessorio2 = "https://i.imgur.com/PlD9H6E.png";
      slotsAcessorio2 = 0;
      itemIDanoFisico = 7;
      itemIAspdPorcentagem = 10;
    }
  }

  function exibirSlots(numeroSlots, posicao) {
    switch (posicao) {
      case "topo":
        if(numeroSlots == 0) {
          $("#cartaTopo").val("");
          $("#cartaTopo").attr("disabled", true);
        } else {
          $("#cartaTopo").attr("disabled", false);
        }
        break;
      case "meio":
        if(numeroSlots == 0) {
          $("#cartaMeio").val("");
          $("#cartaMeio").attr("disabled", true);
        } else {
          $("#cartaMeio").attr("disabled", false);
        }
        break;
      case "armadura":
        if(numeroSlots == 0) {
          $("#cartaArmadura").val("");
          $("#cartaArmadura").attr("disabled", true);
        } else {
          $("#cartaArmadura").attr("disabled", false);
        }
        break;
      case "arco":
        if(numeroSlots == 0) {
          $("#cartaArco1").val("");
          $("#cartaArco1").attr("disabled", true);
          $("#cartaArco2").val("");
          $("#cartaArco2").attr("disabled", true);
        }
        if(numeroSlots == 1) {
          $("#cartaArco1").attr("disabled", false);
          $("#cartaArco2").val("");
          $("#cartaArco2").attr("disabled", true);
        }
        if(numeroSlots == 2) {
          $("#cartaArco1").attr("disabled", false);
          $("#cartaArco2").attr("disabled", false);
        }
        break;
      case "capa":
        if(numeroSlots == 0) {
          $("#cartaCapa").val("");
          $("#cartaCapa").attr("disabled", true);
        } else {
          $("#cartaCapa").attr("disabled", false);
        }
        break;
      case "sapatos":
        if(numeroSlots == 0) {
          $("#cartaSapatos").val("");
          $("#cartaSapatos").attr("disabled", true);
        } else {
          $("#cartaSapatos").attr("disabled", false);
        }
        break;
      case "acessorio1":
        if(numeroSlots == 0) {
          $("#cartaAcessorio1").val("");
          $("#cartaAcessorio1").attr("disabled", true);
        } else {
          $("#cartaAcessorio1").attr("disabled", false);
        }
        break;
      case "acessorio2":
        if(numeroSlots == 0) {
          $("#cartaAcessorio2").val("");
          $("#cartaAcessorio2").attr("disabled", true);
        } else {
          $("#cartaAcessorio2").attr("disabled", false);
        }
        break;
      default:
        alert("sei la");
    }
  }

  function exibirEnchants(encantamento, posicao) {
    if(posicao == "arco") {
      $(".encantamentosSobrenatural, .encantamentosCatapa").hide();
      switch (encantamento) {
        case "sobrenatural":
          $(".encantamentosCatapa select").each(function(){ $(this).val(""); }); $(".encantamentosCatapa").hide();
          $(".encantamentosMalangdo2 select").each(function(){ $(this).val(""); }); $(".encantamentosMalangdo2").hide();
          $(".encantamentosSobrenatural").show();
          break;
        case "catapa":
          $(".encantamentosSobrenatural select").each(function(){ $(this).val(""); }); $(".encantamentosSobrenatural").hide();
          $(".encantamentosMalangdo2 select").each(function(){ $(this).val(""); }); $(".encantamentosMalangdo2").hide();
          $(".encantamentosCatapa").show();
          break;
        case "malang2":
          $(".encantamentosSobrenatural select").each(function(){ $(this).val(""); }); $(".encantamentosSobrenatural").hide();
          $(".encantamentosCatapa select").each(function(){ $(this).val(""); }); $(".encantamentosCatapa").hide();
          $(".encantamentosMalangdo2").show();
          break;
        default:
          $(".encantamentosCatapa select").each(function(){ $(this).val(""); }); $(".encantamentosCatapa").hide();
          $(".encantamentosMalangdo2 select").each(function(){ $(this).val(""); }); $(".encantamentosMalangdo2").hide();
          $(".encantamentosSobrenatural select").each(function(){ $(this).val(""); }); $(".encantamentosSobrenatural").hide();
      }
    }
    if(posicao == "armadura") {
      $(".encantamentosColeteEXC").hide();
      switch (encantamento) {
        case "exc":
          $(".encantamentosColeteEXC").show();
          break;
        default:
          $(".encantamentosColeteEXC select").each(function(){ $(this).val(""); }); $(".encantamentosColeteEXC").hide();
      }
    }
    if(posicao == "capa") {
      $(".encantamentosFAW, .encantamentosMotorEXC").hide();
      switch (encantamento) {
        case "faw":
          $(".encantamentosFAW").show();
          $(".encantamentosMotorEXC select").each(function(){ $(this).val(""); });
          break;
        case "exc":
          $(".encantamentosMotorEXC").show();
          $(".encantamentosFAW select").each(function(){ $(this).val(""); });
          break;
        default:
          $(".encantamentosFAW select, .encantamentosMotorEXC select").each(function(){ $(this).val(""); });
      }
    }
    if(posicao == "sapatos") {
      switch (encantamento) {
        case "encantamentosBotasTemporais":
          $(".encantamentosBotasTemporais").show();
          break;
        default:
          $(".encantamentosBotasTemporais select").each(function(){ $(this).val(""); });
          $(".encantamentosBotasTemporais").hide();
      }
    }
  }

  function cartaTopo() {
    if($("#cartaTopo").val() == "4529") { itemADanoFisico = itemADanoFisico + 2 + parseInt(refinoTopo / 2); }
    if($("#cartaTopo").val() == "4513") { itemADanoCriticoPorcentagem = itemADanoCriticoPorcentagem + 2 + parseInt(refinoTopo / 2); }
    if($("#cartaTopo").val() == "4506") { itemADestreza = itemADestreza + 2; }
    if($("#cartaTopo").val() == "4458" || $("#cartaTopo").val() == "4468") { itemAAtaque = itemAAtaque + 10; }
    if($("#cartaTopo").val() == "4583") { if($("#racaMonstro").val() == "9") { itemAIgnorarDefesa += 30; } if($("#propriedadeMonstro").val() == "80" || $("#propriedadeMonstro").val() == "81" || $("#propriedadeMonstro").val() == "82" || $("#propriedadeMonstro").val() == "83") { itemADanoPropriedade += 30; } }
    if($("#cartaTopo").val() == "4922") { itemADestreza += 4; itemASorte -= 4; }
    if($("#cartaTopo").val() == "4923") { itemASorte += 1; itemADestreza -= 1; itemATaxaCritico += 1; }
    if($("#cartaTopo").val() == "4924") { itemASorte += 2; itemADestreza -= 2; itemATaxaCritico += 2; }
    if($("#cartaTopo").val() == "4925") { itemASorte += 4; itemADestreza -= 4; itemATaxaCritico += 4; }
    if($("#cartaTopo").val() == "4914") { itemAAgilidade += 1  }
    if($("#cartaTopo").val() == "4915") { itemAAgilidade += 2  }
    if($("#cartaTopo").val() == "4916") { itemAAgilidade += 4  }
    if($("#cartaTopo").val() == "4908") { itemAForca += 1; itemAAtaque += 3; }
    if($("#cartaTopo").val() == "4909") { itemAForca += 2; itemAAtaque += 6; }
    if($("#cartaTopo").val() == "4910") { itemAForca += 4; itemAAtaque += 12; }
  }

  function cartaMeio() {
    if($("#cartaMeio").val() == "4529") { itemBDanoFisico = itemBDanoFisico + 2; }
    if($("#cartaMeio").val() == "4506") { itemBDestreza = itemBDestreza + 2; }
    if($("#cartaMeio").val() == "4458" || $("#cartaMeio").val() == "4468") { itemBAtaque = itemBAtaque + 10; }
    if($("#cartaMeio").val() == "4583") { if($("#racaMonstro").val() == "9") { itemBIgnorarDefesa += 30; } if($("#propriedadeMonstro").val() == "80" || $("#propriedadeMonstro").val() == "81" || $("#propriedadeMonstro").val() == "82" || $("#propriedadeMonstro").val() == "83") { itemBDanoPropriedade += 30; } }
    if($("#cartaMeio").val() == "4922") { itemBDestreza += 4; itemBSorte -= 4; }
  }

  function cartaArmadura() {
    if($("#cartaArmadura").val() == "4601") { itemDDanoFisico += 15; }
    if($("#cartaArmadura").val() == "4602") { itemDDanoFisico += 20; }
    if($("#cartaArmadura").val() == "4419" && ($("#propriedadeMonstro").val() == "10" || $("#propriedadeMonstro").val() == "11" || $("#propriedadeMonstro").val() == "12" || $("#propriedadeMonstro").val() == "13")) { itemDDanoPropriedade += 50; }
    if($("#cartaArmadura").val() == "27126") { if($("#racaMonstro").val() == "2" || $("#racaMonstro").val() == "6") itemDDanoRacial += 40; if(parseInt($("#propriedadeMonstro").val()) >= 20 && parseInt($("#propriedadeMonstro").val()) <= 33) itemDDanoPropriedade += 40; }
    if($("#cartaArmadura").val() == "4426") { itemDDanoFisico = itemDDanoFisico + 10; }
    if($("#cartaArmadura").val() == "4408") { if($("#racaMonstro").val() == "1" || $("#racaMonstro").val() == "3") itemDDanoRacial += 40; if(parseInt($("#propriedadeMonstro").val()) >= 50 && parseInt($("#propriedadeMonstro").val()) <= 63) itemDDanoPropriedade += 40; }
    if($("#cartaArmadura").val() == "4337") { itemDAtaque = itemDAtaque + 25; }
    if($("#colexc-e1").val() == "exc-e1-for") { itemDAtaque += parseInt(parseInt($("#for").val()) / 10) * 5; if(parseInt($("#refinoItemArmadura").val()) >= 7) itemDAtaque += 10; }
    if($("#colexc-e1").val() == "exc-e1-atq") { itemDAtaque += 20; }
    if($("#colexc-e2").val() == "exc-e2-atq") { itemDAtaque += 20; }
    if($("#colexc-e3").val() == "exc-e3-atq") { itemDAtaque += 20; }
    if($("#colexc-e3").val() == "exc-e3-vda") { itemDAspdFixa += 1; }
  }

  function cartaArco() {
    if($("#cartaArco1").val() == "4407") { itemEDanoFisico += 10; }
    if($("#cartaArco1").val() == "4633") { itemEDanoDistancia += 10; if(parseInt($("#nivelPersonagem").val()) >= 100) { itemEDanoDistancia += 2; } }
    if($("#cartaArco1").val() == "4094") { itemEDanoDistancia += 10; }
    if($("#cartaArco1").val() == "4578") { itemEDanoCriticoPorcentagem += 30; }
    if($("#cartaArco1").val() == "4464" || $("#cartaArco1").val() == "4172") { itemEDanoCriticoPorcentagem += 20; }
    if($("#cartaArco1").val() == "4521") { itemEDanoCriticoPorcentagem += 15; }
    if($("#cartaArco1").val() == "4317") { itemEDanoCriticoPorcentagem += 15; }
    if($("#cartaArco1").val() == "4140") { itemEDanoMVP += 25; }
    if($("#cartaArco1").val() == "4608") { itemEDanoTamanho += 20; itemEAtaqueEquipamento += 15; }
    if($("#cartaArco1").val() == "4305" || $("#cartaArco1").val() == "4305b") { itemEDanoFisico += 20; }
    if($("#cartaArco1").val() == "4142") { itemEAspdPorcentagem += 10; }
    if($("#cartaArco1").val() == "31021") { itemEAspdPorcentagem += 10; itemEAtaqueArmaPorcentagem -= 3; }
    if($("#cartaArco1").val() == "4421") { itemETaxaCritico += 15; }
    if($("#cartaArco1").val() == "4086") { itemETaxaCritico += 9; }
    if($("#cartaArco1").val() == "4634") { itemETaxaCritico += 9; if(parseInt($("#nivelPersonagem").val()) >= 100) { itemETaxaCritico += 1; itemEDanoCriticoPorcentagem +=5; } }
    if($("#cartaArco1").val() == "4466") { itemEDanoDistancia += 3; if(parseInt($("#refinoItemArco").val()) >= 10) { itemEAspdFixa += 1; } if(parseInt($("#refinoItemArco").val()) >= 14) { itemEAspdFixa += 1; } }
    if($("#cartaArco2").val() == "4407") { itemEDanoFisico += 10; }
    if($("#cartaArco2").val() == "4633") { itemEDanoDistancia += 10; if(parseInt($("#nivelPersonagem").val()) >= 100) { itemEDanoDistancia += 2; } }
    if($("#cartaArco2").val() == "4094") { itemEDanoDistancia += 10; }
    if($("#cartaArco2").val() == "4578") { itemEDanoCriticoPorcentagem += 30; }
    if($("#cartaArco2").val() == "4464" || $("#cartaArco2").val() == "4172") { itemEDanoCriticoPorcentagem += 20; }
    if($("#cartaArco2").val() == "4521") { itemEDanoCriticoPorcentagem += 15; }
    if($("#cartaArco2").val() == "4317") { itemEDanoCriticoPorcentagem += 15; }
    if($("#cartaArco2").val() == "4140") { itemEDanoMVP += 25; }
    if($("#cartaArco2").val() == "4608") { itemEDanoTamanho += 20; itemEAtaqueEquipamento += 15; }
    if($("#cartaArco2").val() == "4305" || $("#cartaArco2").val() == "4305b") { itemEDanoFisico += 20; }
    if($("#cartaArco2").val() == "4142") { itemEAspdPorcentagem += 10; }
    if($("#cartaArco2").val() == "31021") { itemEAspdPorcentagem += 10; itemEAtaqueArmaPorcentagem -= 3; }
    if($("#cartaArco2").val() == "4421") { itemETaxaCritico += 15; }
    if($("#cartaArco2").val() == "4086") { itemETaxaCritico += 9; }
    if($("#cartaArco2").val() == "4634") { itemETaxaCritico += 9; if(parseInt($("#nivelPersonagem").val()) >= 100) { itemETaxaCritico += 1; itemEDanoCriticoPorcentagem +=5; } }
    if($("#cartaArco2").val() == "4466") { itemEDanoDistancia += 3; if(parseInt($("#refinoItemArco").val()) >= 10) { itemEAspdFixa += 1; } if(parseInt($("#refinoItemArco").val()) >= 14) { itemEAspdFixa += 1; } }
    if($("#sobren-e1").val() == "sobren-e1-atqa5") { itemEAtaqueArmaPorcentagem += 5; }
    if($("#sobren-e1").val() == "sobren-e1-atqa10") { itemEAtaqueArmaPorcentagem += 10; }
    if($("#sobren-e2").val() == "sobren-e2-df10") { itemEDanoMVP += 10; }
    if($("#sobren-e2").val() == "sobren-e2-df20") { itemEDanoMVP += 20; }
    if($("#sobren-e2").val() == "sobren-e2-ign15") { itemEIgnorarDefesa += 15; }
    if($("#sobren-e2").val() == "sobren-e2-ign30") { itemEIgnorarDefesa += 30; }
    if($("#sobren-e3").val() == "sobren-e3-des5") { itemEDestreza += 5; }
    if($("#sobren-e3").val() == "sobren-e3-des10") { itemEDestreza += 10; }
    if($("#sobren-e3").val() == "sobren-e3-atq25") { itemEAtaqueEquipamento += 25; }
    if($("#sobren-e3").val() == "sobren-e3-atq50") { itemEAtaqueEquipamento += 50; }
    if($("#sobren-e3").val() == "sobren-e3-dcri10") { itemEDanoCriticoPorcentagem += 10; }
    if($("#sobren-e3").val() == "sobren-e3-dcri20") { itemEDanoCriticoPorcentagem += 20; }
    if($("#sobren-e3").val() == "sobren-e3-dis10") { itemEDanoDistancia += 10; }
    if($("#sobren-e3").val() == "sobren-e3-dis20") { itemEDanoDistancia += 20; }
    if($("#catapa-e1").val() == "catapa-e1-ma3") { itemEDanoDistancia += 6; }
    if($("#catapa-e1").val() == "catapa-e1-ma2") { itemEDanoDistancia += 4; }
    if($("#catapa-e1").val() == "catapa-e1-ma1") { itemEDanoDistancia += 2; }
    if($("#catapa-e1").val() == "catapa-e1-el5") { itemEAtaqueEquipamento += 18; }
    if($("#catapa-e1").val() == "catapa-e1-el4") { itemEAtaqueEquipamento += 15; }
    if($("#catapa-e1").val() == "catapa-e1-el3") { itemEAtaqueEquipamento += 12; }
    if($("#catapa-e1").val() == "catapa-e1-pc3") {  }
    if($("#catapa-e1").val() == "catapa-e1-pc2") {  }
    if($("#catapa-e1").val() == "catapa-e1-pc1") {  }
    if($("#catapa-e2").val() == "catapa-e2-ma3") { itemEDanoDistancia += 6; }
    if($("#catapa-e2").val() == "catapa-e2-ma2") { itemEDanoDistancia += 4; }
    if($("#catapa-e2").val() == "catapa-e2-ma1") { itemEDanoDistancia += 2; }
    if($("#catapa-e2").val() == "catapa-e2-el5") { itemEAtaqueEquipamento += 18; }
    if($("#catapa-e2").val() == "catapa-e2-el4") { itemEAtaqueEquipamento += 15; }
    if($("#catapa-e2").val() == "catapa-e2-el3") { itemEAtaqueEquipamento += 12; }
    if($("#catapa-e2").val() == "catapa-e2-pc3") {  }
    if($("#catapa-e2").val() == "catapa-e2-pc2") {  }
    if($("#catapa-e2").val() == "catapa-e2-pc1") {  }
    if($("#malang-e1").val() == "malang-e1-ma6") { itemEDanoDistancia += 12; }
    if($("#malang-e1").val() == "malang-e1-ma5") { itemEDanoDistancia += 10; }
    if($("#malang-e1").val() == "malang-e1-ma4") { itemEDanoDistancia += 8; }
    if($("#malang-e1").val() == "malang-e1-ma3") { itemEDanoDistancia += 6; }
    if($("#malang-e1").val() == "malang-e1-ma2") { itemEDanoDistancia += 4; }
    if($("#malang-e1").val() == "malang-e1-el8") { itemEAtaqueEquipamento += 27; }
    if($("#malang-e1").val() == "malang-e1-el7") { itemEAtaqueEquipamento += 24; }
    if($("#malang-e1").val() == "malang-e1-el6") { itemEAtaqueEquipamento += 21; }
    if($("#malang-e1").val() == "malang-e1-el5") { itemEAtaqueEquipamento += 18; }
    if($("#malang-e1").val() == "malang-e1-el4") { itemEAtaqueEquipamento += 15; }
    if($("#malang-e1").val() == "malang-e1-pc5") { itemETaxaCritico += 15; }
    if($("#malang-e1").val() == "malang-e1-pc4") { itemETaxaCritico += 14; }
    if($("#malang-e1").val() == "malang-e1-pc3") { itemETaxaCritico += 12; }
    if($("#malang-e1").val() == "malang-e1-pc2") { itemETaxaCritico += 9; }
    if($("#malang-e1").val() == "malang-e1-va1") { itemEAspdFixa += 1; }
    if($("#malang-e2").val() == "malang-e2-ma6") { itemEDanoDistancia += 12; }
    if($("#malang-e2").val() == "malang-e2-ma5") { itemEDanoDistancia += 10; }
    if($("#malang-e2").val() == "malang-e2-ma4") { itemEDanoDistancia += 8; }
    if($("#malang-e2").val() == "malang-e2-ma3") { itemEDanoDistancia += 6; }
    if($("#malang-e2").val() == "malang-e2-ma2") { itemEDanoDistancia += 4; }
    if($("#malang-e2").val() == "malang-e2-el8") { itemEAtaqueEquipamento += 27; }
    if($("#malang-e2").val() == "malang-e2-el7") { itemEAtaqueEquipamento += 24; }
    if($("#malang-e2").val() == "malang-e2-el6") { itemEAtaqueEquipamento += 21; }
    if($("#malang-e2").val() == "malang-e2-el5") { itemEAtaqueEquipamento += 18; }
    if($("#malang-e2").val() == "malang-e2-el4") { itemEAtaqueEquipamento += 15; }
    if($("#malang-e2").val() == "malang-e2-pc5") { itemETaxaCritico += 15; }
    if($("#malang-e2").val() == "malang-e2-pc4") { itemETaxaCritico += 14; }
    if($("#malang-e2").val() == "malang-e2-pc3") { itemETaxaCritico += 12; }
    if($("#malang-e2").val() == "malang-e2-pc2") { itemETaxaCritico += 9; }
    if($("#malang-e2").val() == "malang-e2-va1") { itemEAspdFixa += 1; }
  }

  function flechaArco() {
    if($("#itemFlecha").val() == "1750") { flechaAtaque = 25; $("#propriedadeAtaque").val("0"); }
    if($("#itemFlecha").val() == "1764") { flechaAtaque = 10; $("#propriedadeAtaque").val("0"); }
    if($("#itemFlecha").val() == "1753") { flechaAtaque = 40; $("#propriedadeAtaque").val("0"); }
    if($("#itemFlecha").val() == "1754") { flechaAtaque = 30; $("#propriedadeAtaque").val("1"); }
    if($("#itemFlecha").val() == "1770") { flechaAtaque = 30; $("#propriedadeAtaque").val("0"); }
    if($("#itemFlecha").val() == "1752") { flechaAtaque = 30; $("#propriedadeAtaque").val("3"); }
    if($("#itemFlecha").val() == "1765") { flechaAtaque = 50; $("#propriedadeAtaque").val("0"); }
    if($("#itemFlecha").val() == "1756") { flechaAtaque = 30; $("#propriedadeAtaque").val("2"); }
    if($("#itemFlecha").val() == "1751") { flechaAtaque = 30; $("#propriedadeAtaque").val("6"); }
    if($("#itemFlecha").val() == "1755") { flechaAtaque = 30; $("#propriedadeAtaque").val("4"); }
    if($("#itemFlecha").val() == "1762") { flechaAtaque = 30; $("#propriedadeAtaque").val("5"); }
    if($("#itemFlecha").val() == "1757") { flechaAtaque = 30; $("#propriedadeAtaque").val("8"); }
    if($("#itemFlecha").val() == "1772") { flechaAtaque = 50; $("#propriedadeAtaque").val("6"); if($("#racaMonstro").val() == "3") { itemEDanoRacial += 5; } }
    if($("#itemFlecha").val() == "1767") { flechaAtaque = 30; $("#propriedadeAtaque").val("7"); }
  }

  function cartaCapa() {
    if($("#cartaCapa").val() == "4595") { itemFAspdPorcentagem += parseInt(parseInt($("#agi").val()) / 10) * 2; }
    if($("#cartaCapa").val() == "4593") { itemFDanoDistancia = itemFDanoDistancia + parseInt(parseInt($("#des").val()) / 10) ; }
    if($("#cartaCapa").val() == "4594") { itemFDanoCriticoPorcentagem = itemFDanoCriticoPorcentagem + parseInt(parseInt($("#sor").val()) / 10) * 2 ; }
    if($("#cartaCapa").val() == "4588") { itemFAtaque = itemFAtaque + parseInt(parseInt($("#for").val()) / 10) * 5 ; }
    if($("#faw-e1").val() == "faw-e1-ma4") { itemFDanoDistancia += 8; }
    if($("#faw-e1").val() == "faw-e1-ma3") { itemFDanoDistancia += 6; }
    if($("#faw-e1").val() == "faw-e1-ma2") { itemFDanoDistancia += 4; }
    if($("#faw-e1").val() == "faw-e1-ma1") { itemFDanoDistancia += 2; }
    if($("#faw-e1").val() == "faw-e1-aa4") { itemFAspdFixa += 1; }
    if($("#faw-e1").val() == "faw-e1-aa3") { itemFAspdPorcentagem += 8; }
    if($("#faw-e1").val() == "faw-e1-aa2") { itemFAspdPorcentagem += 6; }
    if($("#faw-e1").val() == "faw-e1-aa1") { itemFAspdPorcentagem += 4; }
    if($("#faw-e1").val() == "faw-e1-el6") { itemFAtaque += 21; }
    if($("#faw-e1").val() == "faw-e1-el5") { itemFAtaque += 18; }
    if($("#faw-e1").val() == "faw-e1-el4") { itemFAtaque += 15; }
    if($("#faw-e1").val() == "faw-e1-el3") { itemFAtaque += 12; }
    if($("#faw-e1").val() == "faw-e1-fa4") { itemFDanoCriticoPorcentagem += 10; }
    if($("#faw-e1").val() == "faw-e1-fa3") { itemFDanoCriticoPorcentagem += 8; }
    if($("#faw-e1").val() == "faw-e1-fa2") { itemFDanoCriticoPorcentagem += 6; }
    if($("#faw-e1").val() == "faw-e1-fa1") { itemFDanoCriticoPorcentagem += 4; }
    if($("#faw-e2").val() == "faw-e2-ma3") { itemFDanoDistancia += 6; }
    if($("#faw-e2").val() == "faw-e2-ma2") { itemFDanoDistancia += 4; }
    if($("#faw-e2").val() == "faw-e2-ma1") { itemFDanoDistancia += 2; }
    if($("#faw-e2").val() == "faw-e2-aa3") { itemFAspdPorcentagem += 8; }
    if($("#faw-e2").val() == "faw-e2-aa2") { itemFAspdPorcentagem += 6; }
    if($("#faw-e2").val() == "faw-e2-aa1") { itemFAspdPorcentagem += 4; }
    if($("#faw-e2").val() == "faw-e2-el5") { itemFAtaque += 18; }
    if($("#faw-e2").val() == "faw-e2-el4") { itemFAtaque += 15; }
    if($("#faw-e2").val() == "faw-e2-el3") { itemFAtaque += 12; }
    if($("#faw-e2").val() == "faw-e2-fa3") { itemFDanoCriticoPorcentagem += 8; }
    if($("#faw-e2").val() == "faw-e2-fa2") { itemFDanoCriticoPorcentagem += 6; }
    if($("#faw-e2").val() == "faw-e2-fa1") { itemFDanoCriticoPorcentagem += 4; }
    if($("#faw-e3").val() == "faw-e3-ma3") { itemFDanoDistancia += 6; }
    if($("#faw-e3").val() == "faw-e3-ma2") { itemFDanoDistancia += 4; }
    if($("#faw-e3").val() == "faw-e3-ma1") { itemFDanoDistancia += 2; }
    if($("#faw-e3").val() == "faw-e3-aa3") { itemFAspdPorcentagem += 8; }
    if($("#faw-e3").val() == "faw-e3-aa2") { itemFAspdPorcentagem += 6; }
    if($("#faw-e3").val() == "faw-e3-aa1") { itemFAspdPorcentagem += 4; }
    if($("#faw-e3").val() == "faw-e3-el5") { itemFAtaque += 18; }
    if($("#faw-e3").val() == "faw-e3-el4") { itemFAtaque += 15; }
    if($("#faw-e3").val() == "faw-e3-el3") { itemFAtaque += 12; }
    if($("#faw-e3").val() == "faw-e3-fa3") { itemFDanoCriticoPorcentagem += 8; }
    if($("#faw-e3").val() == "faw-e3-fa2") { itemFDanoCriticoPorcentagem += 6; }
    if($("#faw-e3").val() == "faw-e3-fa1") { itemFDanoCriticoPorcentagem += 4; }
    if($("#motexc-e1").val() == "exc-e1-atq") { itemFAtaque += 20; }
    if($("#motexc-e2").val() == "exc-e2-atq") { itemFAtaque += 20; }
    if($("#motexc-e3").val() == "exc-e3-atq") { itemFAtaque += 20; }
    if($("#motexc-e3").val() == "exc-e3-vda") { itemFAspdFixa += 1; }
  }

  function cartaSapatos() {
    if($("#cartaSapatos").val() == "4236") { itemGForca += 1; itemGAgilidade += 1; itemGDestreza += 1; itemGSorte += 1; }
    if($("#cartaSapatos").val() == "31017") { itemGAtaqueArmaPorcentagem = itemGAtaqueArmaPorcentagem + 1 + parseInt(parseInt($("#refinoItemSapatos").val()) / 2); }
    if($("#cartaSapatos").val() == "27164") { itemGDanoCriticoPorcentagem = itemGDanoCriticoPorcentagem + parseInt($("#refinoItemSapatos").val()); itemGTaxaCritico = itemGTaxaCritico + 15 + parseInt($("#refinoItemSapatos").val()); }
    if($("#cartaSapatos").val() == "4922") { itemGDestreza += 4; itemGSorte -= 4; }
    if($("#cartaSapatos").val() == "4923") { itemGSorte += 1; itemGDestreza -= 1; itemGTaxaCritico += 1; }
    if($("#cartaSapatos").val() == "4924") { itemGSorte += 2; itemGDestreza -= 2; itemGTaxaCritico += 2; }
    if($("#cartaSapatos").val() == "4925") { itemGSorte += 4; itemGDestreza -= 4; itemGTaxaCritico += 4; }
    if($("#cartaSapatos").val() == "4914") { itemGAgilidade += 1 }
    if($("#cartaSapatos").val() == "4915") { itemGAgilidade += 2 }
    if($("#cartaSapatos").val() == "4916") { itemGAgilidade += 4 }
    if($("#cartaSapatos").val() == "4908") { itemGForca += 1; itemGAtaque += 3; }
    if($("#cartaSapatos").val() == "4909") { itemGForca += 2; itemGAtaque += 6; }
    if($("#cartaSapatos").val() == "4910") { itemGForca += 4; itemGAtaque += 12; }
    if($("#btemp-e1").val() == "btemp-e1-el7") { itemGAtaque += 24; }
    if($("#btemp-e1").val() == "btemp-e1-ma4") { itemGDanoDistancia += 8; }
    if($("#btemp-e1").val() == "btemp-e1-aa4") { itemGAspdPorcentagem += 10; }
    if($("#btemp-e1").val() == "btemp-e1-sor") { itemGSorte += 6; }
    if($("#btemp-e2").val() == "btemp-e2-ins") { itemGDestreza += 200; }
    if($("#btemp-e2").val() == "btemp-e2-del") { itemGForca += 200; }
    if($("#btemp-e2").val() == "btemp-e2-euf") { itemGSorte += 200; }
  }

  function cartaAcessorio1() {
    if($("#cartaAcessorio1").val() == "4091") { itemHTaxaCritico += 4; itemHForca += 1; }
    if($("#cartaAcessorio1").val() == "4631") { itemHAspdPorcentagem += 3; }
    if($("#cartaAcessorio1").val() == "27018") { itemHAspdPorcentagem += 1; if(parseInt($("#nivelPersonagem").val()) >= 90) { itemHAspdPorcentagem += 1; } if(parseInt($("#nivelPersonagem").val()) >= 120) { itemHAspdPorcentagem += 1; } }
    if($("#cartaAcessorio1").val() == "4430") { itemHAtaque += parseInt(parseInt($("#nivelClasse").val()) / 10); itemHTaxaCritico += parseInt(parseInt($("#nivelClasse").val()) / 10); }
    if($("#cartaAcessorio1").val() == "4508") { itemHAtaque = itemHAtaque + 20; }
    if($("#cartaAcessorio1").val() == "4639") { itemHDanoFisico += 1; }
    if($("#cartaAcessorio1").val() == "4922") { itemHDestreza += 4; itemHSorte -= 4; }
    if($("#cartaAcessorio1").val() == "4064") { itemHDestreza = itemHDestreza + 3; }
    if($("#cartaAcessorio1").val() == "4923") { itemHSorte += 1; itemHDestreza -= 1; itemHTaxaCritico += 1; }
    if($("#cartaAcessorio1").val() == "4924") { itemHSorte += 2; itemHDestreza -= 2; itemHTaxaCritico += 2; }
    if($("#cartaAcessorio1").val() == "4925") { itemHSorte += 4; itemHDestreza -= 4; itemHTaxaCritico += 4; }
    if($("#cartaAcessorio1").val() == "4914") { itemHAgilidade += 1 }
    if($("#cartaAcessorio1").val() == "4915") { itemHAgilidade += 2 }
    if($("#cartaAcessorio1").val() == "4916") { itemHAgilidade += 4 }
    if($("#cartaAcessorio1").val() == "4908") { itemHForca += 1; itemHAtaque += 3; }
    if($("#cartaAcessorio1").val() == "4909") { itemHForca += 2; itemHAtaque += 6; }
    if($("#cartaAcessorio1").val() == "4910") { itemHForca += 4; itemHAtaque += 12; }
  }

  function cartaAcessorio2() {
    if($("#cartaAcessorio2").val() == "4091") { itemITaxaCritico += 4; itemIForca += 1; }
    if($("#cartaAcessorio2").val() == "4631") { itemIAspdPorcentagem += 3; }
    if($("#cartaAcessorio2").val() == "27018") { itemIAspdPorcentagem += 1; if(parseInt($("#nivelPersonagem").val()) >= 90) { itemIAspdPorcentagem += 1; } if(parseInt($("#nivelPersonagem").val()) >= 120) { itemIAspdPorcentagem += 1; } }
    if($("#cartaAcessorio2").val() == "4430") { itemIAtaque += parseInt(parseInt($("#nivelClasse").val()) / 10); itemITaxaCritico += parseInt(parseInt($("#nivelClasse").val()) / 10); }
    if($("#cartaAcessorio2").val() == "4508") { itemIAtaque = itemIAtaque + 20; }
    if($("#cartaAcessorio2").val() == "4639") { itemIDanoFisico += 1; }
    if($("#cartaAcessorio2").val() == "4922") { itemIDestreza += 4; itemAISorte -= 4; }
    if($("#cartaAcessorio2").val() == "4064") { itemIDestreza = itemIDestreza + 3; }
    if($("#cartaAcessorio2").val() == "4923") { itemISorte += 1; itemIDestreza -= 1; itemITaxaCritico += 1; }
    if($("#cartaAcessorio2").val() == "4924") { itemISorte += 2; itemIDestreza -= 2; itemITaxaCritico += 2; }
    if($("#cartaAcessorio2").val() == "4925") { itemISorte += 4; itemIDestreza -= 4; itemITaxaCritico += 4; }
    if($("#cartaAcessorio2").val() == "4914") { itemIAgilidade += 1 }
    if($("#cartaAcessorio2").val() == "4915") { itemIAgilidade += 2 }
    if($("#cartaAcessorio2").val() == "4916") { itemIAgilidade += 4 }
    if($("#cartaAcessorio2").val() == "4908") { itemIForca += 1; itemIAtaque += 3; }
    if($("#cartaAcessorio2").val() == "4909") { itemIForca += 2; itemIAtaque += 6; }
    if($("#cartaAcessorio2").val() == "4910") { itemIForca += 4; itemIAtaque += 12; }
  }

  function definirTopo() {
    $("#imagemTopo").attr("src",imagemTopo); if($("#imagemTopo").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemTopo").addClass("pointer"); } else { $("#imagemTopo").removeClass("pointer"); } $("#itemATaxaCritico").val(itemATaxaCritico); $("#itemAAspdPorcentagem").val(itemAAspdPorcentagem); $("#itemAAspdFixa").val(itemAAspdFixa); $("#itemAIgnorarDefesa").val(itemAIgnorarDefesa); $("#itemAAtaque").val(itemAAtaque); $("#itemAAtaqueArmaPorcentagem").val(itemAAtaqueArmaPorcentagem); $("#itemADanoFisico").val(itemADanoFisico); /* $("#itemADanoFisicoMonstro").val(itemADanoFisicoMonstro); */ $("#itemADanoMVP").val(itemADanoMVP); $("#itemADanoDistancia").val(itemADanoDistancia); $("#itemADanoCriticoPorcentagem").val(itemADanoCriticoPorcentagem); $("#itemADanoRacial").val(itemADanoRacial); $("#itemADanoPropriedade").val(itemADanoPropriedade); $("#itemADanoTamanho").val(itemADanoTamanho); $("#itemADestreza").val(itemADestreza); $("#itemAForca").val(itemAForca); $("#itemAAgilidade").val(itemAAgilidade); $("#itemASorte").val(itemASorte);
  }

  function definirMeio() {
    $("#imagemMeio").attr("src",imagemMeio); if($("#imagemMeio").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemMeio").addClass("pointer"); } else { $("#imagemMeio").removeClass("pointer"); } $("#itemBTaxaCritico").val(itemBTaxaCritico); $("#itemBAspdPorcentagem").val(itemBAspdPorcentagem); $("#itemBAspdFixa").val(itemBAspdFixa); $("#itemBIgnorarDefesa").val(itemBIgnorarDefesa); $("#itemBAtaque").val(itemBAtaque); $("#itemBAtaqueArmaPorcentagem").val(itemBAtaqueArmaPorcentagem); $("#itemBDanoFisico").val(itemBDanoFisico); /* $("#itemBDanoFisicoMonstro").val(itemBDanoFisicoMonstro); */ $("#itemBDanoMVP").val(itemBDanoMVP); $("#itemBDanoDistancia").val(itemBDanoDistancia); $("#itemBDanoCriticoPorcentagem").val(itemBDanoCriticoPorcentagem); $("#itemBDanoRacial").val(itemBDanoRacial); $("#itemBDanoPropriedade").val(itemBDanoPropriedade); $("#itemBDanoTamanho").val(itemBDanoTamanho); $("#itemBDestreza").val(itemBDestreza); $("#itemBForca").val(itemBForca); $("#itemBAgilidade").val(itemBAgilidade); $("#itemBSorte").val(itemBSorte);
  }

  function definirBaixo() {
    $("#imagemBaixo").attr("src",imagemBaixo); if($("#imagemBaixo").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemBaixo").addClass("pointer"); } else { $("#imagemBaixo").removeClass("pointer"); } $("#itemCTaxaCritico").val(itemCTaxaCritico); $("#itemCAspdPorcentagem").val(itemCAspdPorcentagem); $("#itemCAspdFixa").val(itemCAspdFixa); $("#itemCIgnorarDefesa").val(itemCIgnorarDefesa); $("#itemCAtaque").val(itemCAtaque); $("#itemCAtaqueArmaPorcentagem").val(itemCAtaqueArmaPorcentagem); $("#itemCDanoFisico").val(itemCDanoFisico); /* $("#itemCDanoFisicoMonstro").val(itemCDanoFisicoMonstro); */ $("#itemCDanoMVP").val(itemCDanoMVP); $("#itemCDanoDistancia").val(itemCDanoDistancia); $("#itemCDanoCriticoPorcentagem").val(itemCDanoCriticoPorcentagem); $("#itemCDanoRacial").val(itemCDanoRacial); $("#itemCDanoPropriedade").val(itemCDanoPropriedade); $("#itemCDanoTamanho").val(itemCDanoTamanho); $("#itemCDestreza").val(itemCDestreza); $("#itemCForca").val(itemCForca); $("#itemCAgilidade").val(itemCAgilidade); $("#itemCSorte").val(itemCSorte);
  }

  function definirArmadura() {
    $("#imagemArmadura").attr("src",imagemArmadura); if($("#imagemArmadura").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemArmadura").addClass("pointer"); } else { $("#imagemArmadura").removeClass("pointer"); } $("#itemDTaxaCritico").val(itemDTaxaCritico); $("#itemDAspdPorcentagem").val(itemDAspdPorcentagem); $("#itemDAspdFixa").val(itemDAspdFixa); $("#itemDIgnorarDefesa").val(itemDIgnorarDefesa); $("#itemDAtaque").val(itemDAtaque); $("#itemDAtaqueArmaPorcentagem").val(itemDAtaqueArmaPorcentagem); $("#itemDDanoFisico").val(itemDDanoFisico); /* $("#itemDDanoFisicoMonstro").val(itemDDanoFisicoMonstro); */ $("#itemDDanoMVP").val(itemDDanoMVP); $("#itemDDanoDistancia").val(itemDDanoDistancia); $("#itemDDanoCriticoPorcentagem").val(itemDDanoCriticoPorcentagem); $("#itemDDanoRacial").val(itemDDanoRacial); $("#itemDDanoPropriedade").val(itemDDanoPropriedade); $("#itemDDanoTamanho").val(itemDDanoTamanho); $("#itemDDestreza").val(itemDDestreza); $("#itemDForca").val(itemDForca); $("#itemDAgilidade").val(itemDAgilidade); $("#itemDSorte").val(itemDSorte);
  }

  function definirArco() {
    $("#imagemArco").attr("src",imagemArco); if($("#imagemArco").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemArco").addClass("pointer"); } else { $("#imagemArco").removeClass("pointer"); } $("#itemETaxaCritico").val(itemETaxaCritico); $("#itemEAspdPorcentagem").val(itemEAspdPorcentagem); $("#itemEAspdFixa").val(itemEAspdFixa); $("#itemEIgnorarDefesa").val(itemEIgnorarDefesa); $("#itemEAtaque").val(itemEAtaque); $("#itemEAtaqueEquipamento").val(itemEAtaqueEquipamento); $("#flechaAtaque").val(flechaAtaque); $("#itemEAtaqueArmaPorcentagem").val(itemEAtaqueArmaPorcentagem); $("#itemEDanoFisico").val(itemEDanoFisico); /* $("#itemEDanoFisicoMonstro").val(itemEDanoFisicoMonstro); */ $("#itemEDanoMVP").val(itemEDanoMVP); $("#itemEDanoDistancia").val(itemEDanoDistancia); $("#itemEDanoCriticoPorcentagem").val(itemEDanoCriticoPorcentagem); $("#itemEDanoRacial").val(itemEDanoRacial); $("#itemEDanoPropriedade").val(itemEDanoPropriedade); $("#itemEDanoTamanho").val(itemEDanoTamanho); $("#itemEDestreza").val(itemEDestreza); $("#itemEForca").val(itemEForca); $("#itemEAgilidade").val(itemEAgilidade); $("#itemESorte").val(itemESorte);
  }

  function definirEscudo() {
    $("#imagemEscudo").attr("src",imagemEscudo); if($("#imagemEscudo").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemEscudo").addClass("pointer"); } else { $("#imagemEscudo").removeClass("pointer"); } $("#itemJAtaque").val(itemJAtaque);
  }

  function definirCapa() {
    $("#imagemCapa").attr("src",imagemCapa); if($("#imagemCapa").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemCapa").addClass("pointer"); } else { $("#imagemCapa").removeClass("pointer"); } $("#itemFTaxaCritico").val(itemFTaxaCritico); $("#itemFAspdPorcentagem").val(itemFAspdPorcentagem); $("#itemFAspdFixa").val(itemFAspdFixa); $("#itemFIgnorarDefesa").val(itemFIgnorarDefesa); $("#itemFAtaque").val(itemFAtaque); $("#itemFAtaqueArmaPorcentagem").val(itemFAtaqueArmaPorcentagem); $("#itemFDanoFisico").val(itemFDanoFisico); /* $("#itemFDanoFisicoMonstro").val(itemFDanoFisicoMonstro); */ $("#itemFDanoMVP").val(itemFDanoMVP); $("#itemFDanoDistancia").val(itemFDanoDistancia); $("#itemFDanoCriticoPorcentagem").val(itemFDanoCriticoPorcentagem); $("#itemFDanoRacial").val(itemFDanoRacial); $("#itemFDanoPropriedade").val(itemFDanoPropriedade); $("#itemFDanoTamanho").val(itemFDanoTamanho); $("#itemFDestreza").val(itemFDestreza); $("#itemFForca").val(itemFForca); $("#itemFAgilidade").val(itemFAgilidade); $("#itemFSorte").val(itemFSorte);
  }

  function definirSapatos() {
    $("#imagemSapatos").attr("src",imagemSapatos); if($("#imagemSapatos").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemSapatos").addClass("pointer"); } else { $("#imagemSapatos").removeClass("pointer"); } $("#itemGTaxaCritico").val(itemGTaxaCritico); $("#itemGAspdPorcentagem").val(itemGAspdPorcentagem); $("#itemGAspdFixa").val(itemGAspdFixa); $("#itemGIgnorarDefesa").val(itemGIgnorarDefesa); $("#itemGAtaque").val(itemGAtaque); $("#itemGAtaqueArmaPorcentagem").val(itemGAtaqueArmaPorcentagem); $("#itemGDanoFisico").val(itemGDanoFisico); /* $("#itemGDanoFisicoMonstro").val(itemGDanoFisicoMonstro); */ $("#itemGDanoMVP").val(itemGDanoMVP); $("#itemGDanoDistancia").val(itemGDanoDistancia); $("#itemGDanoCriticoPorcentagem").val(itemGDanoCriticoPorcentagem); $("#itemGDanoRacial").val(itemGDanoRacial); $("#itemGDanoPropriedade").val(itemGDanoPropriedade); $("#itemGDanoTamanho").val(itemGDanoTamanho); $("#itemGDestreza").val(itemGDestreza); $("#itemGForca").val(itemGForca); $("#itemGAgilidade").val(itemGAgilidade); $("#itemGSorte").val(itemGSorte);
  }

  function definirAcessorio1() {
    $("#imagemAcessorio1").attr("src",imagemAcessorio1); if($("#imagemAcessorio1").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemAcessorio1").addClass("pointer"); } else { $("#imagemAcessorio1").removeClass("pointer"); } $("#itemHTaxaCritico").val(itemHTaxaCritico); $("#itemHAspdPorcentagem").val(itemHAspdPorcentagem); $("#itemHAspdFixa").val(itemHAspdFixa); $("#itemHIgnorarDefesa").val(itemHIgnorarDefesa); $("#itemHAtaque").val(itemHAtaque); $("#itemHAtaqueArmaPorcentagem").val(itemHAtaqueArmaPorcentagem); $("#itemHDanoFisico").val(itemHDanoFisico); /* $("#itemHDanoFisicoMonstro").val(itemHDanoFisicoMonstro); */ $("#itemHDanoMVP").val(itemHDanoMVP); $("#itemHDanoDistancia").val(itemHDanoDistancia); $("#itemHDanoCriticoPorcentagem").val(itemHDanoCriticoPorcentagem); $("#itemHDanoRacial").val(itemHDanoRacial); $("#itemHDanoPropriedade").val(itemHDanoPropriedade); $("#itemHDanoTamanho").val(itemHDanoTamanho); $("#itemHDestreza").val(itemHDestreza); $("#itemHForca").val(itemHForca); $("#itemHAgilidade").val(itemHAgilidade); $("#itemHSorte").val(itemHSorte);
  }

  function definirAcessorio2() {
    $("#imagemAcessorio2").attr("src",imagemAcessorio2); if($("#imagemAcessorio2").attr("src") != "https://i.imgur.com/OWGO9bw.png") { $("#imagemAcessorio2").addClass("pointer"); } else { $("#imagemAcessorio2").removeClass("pointer"); } $("#itemITaxaCritico").val(itemITaxaCritico); $("#itemIAspdPorcentagem").val(itemIAspdPorcentagem); $("#itemIAspdFixa").val(itemIAspdFixa); $("#itemIIgnorarDefesa").val(itemIIgnorarDefesa); $("#itemIAtaque").val(itemIAtaque); $("#itemIAtaqueArmaPorcentagem").val(itemIAtaqueArmaPorcentagem); $("#itemIDanoFisico").val(itemIDanoFisico); /* $("#itemIDanoFisicoMonstro").val(itemIDanoFisicoMonstro); */ $("#itemIDanoMVP").val(itemIDanoMVP); $("#itemIDanoDistancia").val(itemIDanoDistancia); $("#itemIDanoCriticoPorcentagem").val(itemIDanoCriticoPorcentagem); $("#itemIDanoRacial").val(itemIDanoRacial); $("#itemIDanoPropriedade").val(itemIDanoPropriedade); $("#itemIDanoTamanho").val(itemIDanoTamanho); $("#itemIDestreza").val(itemIDestreza); $("#itemIForca").val(itemIForca); $("#itemIAgilidade").val(itemIAgilidade); $("#itemISorte").val(itemISorte);
  }

  function calcularPontosAtributo() {
    pontosAtributoTotais = 0;
    for(var i = 0; i < parseInt($("#nivelPersonagem").val()); i++) {
      pontosAtributoTotais += pontosAtributoPorNivel[i];
    }
    $("#for, #agi, #vit, #int, #des, #sor").each(function(){
      var pontosDistribuidos = parseInt($(this).val());
      if(pontosDistribuidos > maximoAtributos) { $(this).val(maximoAtributos); pontosDistribuidos = maximoAtributos; }
      for(var ii = 0; ii < pontosDistribuidos; ii++) {
        pontosAtributoTotais -= pontosGastosPorAtributo[ii];
      }
    });
    if($("#adotado").prop("checked")) { pontosAtributoTotais -= 52; }
    $("#disponiveis").val(pontosAtributoTotais);
  }

  calcularPontosAtributo();

  $("#itemTopo, #refinoItemTopo, #cartaTopo, #itemMeio, #cartaMeio, #itemBaixo, #refinoItemArmadura, #itemArmadura, #cartaArmadura, #refinoItemArco, #itemArco, #cartaArco1, #cartaArco2, #itemFlecha, #itemEscudo, #refinoItemCapa, #itemCapa, #cartaCapa, #refinoItemSapatos, #itemSapatos, #cartaSapatos, #itemAcessorio1, #cartaAcessorio1, #itemAcessorio2, #cartaAcessorio2, #for, #agi, #vit, #int, #des, #sor, #nivelPersonagem, #propriedadeAtaque, #propriedadeConversor, #nivelClasse, #propriedadeMonstro, #racaMonstro, #chefe, .encantamentos select, #hardDEF, #tamanho, .lista-consumiveis input").on("change", function() {

    var selectAlterado = $(this);

    if($("#itemSapatos").val() !=  "22171" && sapatosAntigos == "22171") {
      if($("#itemArco").val() == "18170b") { $("#itemArco").val("18170"); }
      if($("#itemArco").val() == "18164b") { $("#itemArco").val("18164"); }
    }

    itemTopo = $("#itemTopo").val();
    refinoTopo = parseInt($("#refinoItemTopo").val());
    resetarTopo();
    if(itemTopo != "") {
      switch (itemTopo) {
        case "5342":
          marianne();
          break;
        case "19316":
          esquilo();
          break;
        case "19316a":
          esquiloa();
          break;
        case "19296":
          chique();
          break;
        case "400006":
          cocar();
          break;
        case "19029":
          malice();
          break;
        case "19111":
          cecila();
          break;
        case "18541":
          ccacador();
          break;
        case "5360":
          ofelinas();
          break;
        case "19263":
          xogunato();
          break;
        case "19019":
          copas();
          break;
        case "5127":
          emorrigane();
          break;
        default:
          resetarTopo();
      }
    }
    exibirSlots(slotsTopo, "topo");
    cartaTopo();
    definirTopo();

    itemMeio = $("#itemMeio").val();
    resetarMeio();
    if(itemMeio != "") {
      switch (itemMeio) {
        case "19444a":
          tapaoa();
          break;
        case "19444b":
          tapaob();
          break;
        case "5918":
          marcas();
          break;
        case "19456a":
          mtengua();
          break;
        case "19456b":
          mtengub();
          break;
        case "19110a":
          popstara();
          break;
        case "19110b":
          popstarb();
          break;
        case "2295":
          venda();
          break;
        case "18912":
          resetarMeio();
          imagemMeio = "https://i.imgur.com/n7aMkmY.png";
          slotsMeio = 1;
          break;
        case "19138":
          serafim();
          break;
        case "18823":
          grifo();
          break;
        case "5325":
          bionicos();
          break;
        case "2202":
          escuros();
          break;
        case "19393":
          pdesbravador();
          break;
        default:
          resetarMeio();
      }
    }
    exibirSlots(slotsMeio, "meio");
    cartaMeio();
    definirMeio();

    itemBaixo = $("#itemBaixo").val();
    resetarBaixo();
    if(itemBaixo != "") {
      switch (itemBaixo) {
        case "19306":
          ccomodo();
          break;
        case "19321":
          pombinho();
          break;
        case "19101":
          familiar();
          break;
        case "19318":
          rosario();
          break;
        case "19305a":
          fadasa();
          break;
        case "19305b":
          fadasb();
          break;
        case "28502":
          infame();
          break;
        case "18844":
          pouring();
          break;
        case "19268":
          halito();
          break;
        case "5361":
          fugitivo();
          break;
        case "19112":
          ptengu();
          break;
        default:
          resetarBaixo();
      }
    }
    definirBaixo();

    itemArmadura = $("#itemArmadura").val();
    refinoArmadura = parseInt($("#refinoArmadura").val());
    resetarArmadura();
    if(itemArmadura != "") {
      switch (itemArmadura) {
        case "15272":
          khalitzburg();
          break;
        case "15254":
          abissal();
          break;
        case "15421":
          robegraca();
          break;
        case "15374":
          eclipse();
          break;
        case "15346":
          afortunado();
          break;
        case "15354":
          astuto();
          break;
        case "15353":
          agil();
          break;
        case "15278":
          robusto();
          break;
        case "15240":
          vermelho();
          break;
        case "15383":
          sstempo();
          break;
        case "15128":
          colete();
          break;
        case "15283":
          senshi();
          break;
        case "19048":
          vorags();
          break;
        case "15097b":
          ocultacaob();
          break;
        default:
          resetarArmadura();
      }
    }
    exibirSlots(slotsArmadura, "armadura");
    exibirEnchants(encantamentoArmadura, "armadura");
    cartaArmadura();
    definirArmadura();

    itemArco = $("#itemArco").val();
    refinoItemArco = parseInt($("#refinoItemArco").val());
    resetarArco();
    if(itemArco != "") {
      switch (itemArco) {
        case "18125":
          demoniaco(selectAlterado);
          break;
        case "18130":
          rubi();
          break;
        case "18170":
          aancestral();
          break;
        case "18170b":
          aancestralb(selectAlterado);
          break;
        case "18121":
          sobrenatural();
          break;
        case "18164":
          bancestral();
          break;
        case "18164b":
          bancestralb(selectAlterado);
          break;
        case "18115":
          orc(selectAlterado);
          break;
        case "18109":
          catapulta();
          break;
        case "1730":
          elementais("1730", selectAlterado);
          break;
        case "1731":
          elementais("1731", selectAlterado);
          break;
        case "1732":
          elementais("1732", selectAlterado);
          break;
        case "1733":
          elementais("1733", selectAlterado);
          break;
        case "1716":
          gakkung();
          break;
        default:
          resetarArco();
      }
      flechaArco();
    }
    exibirSlots(slotsArco, "arco");
    exibirEnchants(encantamentoArco, "arco");
    cartaArco();
    definirArco();

    itemEscudo = $("#itemEscudo").val();
    resetarEscudo();
    if(itemEscudo != "") {
      switch (itemEscudo) {
        case "28947":
          escudogaia();
          break;
        case "2147":
          escudoredondo();
          break;
        case "28900":
          egiderealeza();
          break;
        default:
          resetarEscudo();
      }
    }
    definirEscudo();

    itemCapa = $("#itemCapa").val();
    refinoItemCapa = parseInt($("#refinoItemCapa").val());
    resetarCapa();
    if(itemCapa != "") {
      switch (itemCapa) {
        case "20941":
          mantofen();
          break;
        case "20922":
          mantolev();
          break;
        case "20964":
          mantoagi();
          break;
        case "20967":
          mantodes();
          break;
        case "20963":
          mantofor();
          break;
        case "20968":
          mantosor();
          break;
        case "2589":
          arcanjo();
          break;
        case "20773":
          motor();
          break;
        case "2576":
          mochila();
          break;
        case "20939":
          mstempo();
          break;
        case "2519":
          mmorrigane();
          break;
        case "20799":
          mochileiro();
          break;
        case "20718a":
          vermea();
          break;
        default:
          resetarCapa();
      }
    }
    exibirSlots(slotsCapa, "capa");
    exibirEnchants(encantamentoCapa, "capa");
    cartaCapa();
    definirCapa();

    itemSapatos = $("#itemSapatos").val();
    resetarSapatos();
    if(itemSapatos != "") {
      switch (itemSapatos) {
        case "22005a":
          temporaissor(1);
          break;
        case "22005b":
          temporaissor(0);
          break;
        case "22004a":
          temporaisdes(1);
          break;
        case "22004b":
          temporaisdes(0);
          break;
        case "22002a":
          temporaisagi(1);
          break;
        case "22002b":
          temporaisagi(0);
          break;
        case "22000a":
          temporaisfor(1);
          break;
        case "22000b":
          temporaisfor(0);
          break;
        case "22071":
          saltoelegante(selectAlterado);
          break;
        case "22195":
          inteligentes();
          break;
        case "22082":
          sluxuosos();
          break;
        case "22172":
          aladas();
          break;
        case "22171":
          bancestrais();
          break;
        case "22204":
          bstempo();
          break;
        case "2448":
          svelozes();
          break;
        case "2408":
          grilhoes();
          break;
        default:
          resetarSapatos();
      }
    }
    exibirSlots(slotsSapatos, "sapatos");
    exibirEnchants(encantamentoSapatos, "sapatos");
    cartaSapatos();
    definirSapatos();
    sapatosAntigos = itemSapatos;

    itemAcessorio1 = $("#itemAcessorio1").val();
    resetarAcessorio1();
    if(itemAcessorio1 != "") {
      switch (itemAcessorio1) {
        case "2913":
          apresidiario("acessorio1");
          break;
        case "28501":
          ckirin("acessorio1");
          break;
        case "2650":
          cmorrigane("acessorio1");
          break;
        case "2651":
          pmorrigane("acessorio1");
          break;
        case "490031":
          cpetal("acessorio1");
          break;
        case "28565":
          moni("acessorio1");
          break;
        case "32205":
          aesmeralda("acessorio1");
          break;
        case "28505":
          acapiroto("acessorio1");
          break;
        case "32243":
          adesbravador("acessorio1");
          break;
        case "28438":
          fada("acessorio1");
          break;
        case "28521":
          pgigante("acessorio1");
          break;
        case "28433":
          cristalazul("acessorio1");
          break;
        case "28411":
          esmeralda("acessorio1");
          break;
        case "28492a":
        case "28492b":
        case "28492c":
        case "28492d":
          diario("acessorio1");
          break;
        case "28531":
          lvigor("acessorio1");
          break;
        case "28491":
          matagi("acessorio1");
          break;
        case "32221":
          astempo("acessorio1");
          break;
        case "28561":
          adraco("acessorio1");
          break;
        case "2655":
          bferro("acessorio1");
          break;
        case "2855":
          rabogp("acessorio1");
          break;
        case "2928a":
          lsorte("acessorio1",1);
          break;
        case "2928b":
          lsorte("acessorio1",0);
          break;
        case "2910":
          bakonawa("acessorio1");
          break;
        default:
          resetarAcessorio1();
      }
    }
    exibirSlots(slotsAcessorio1, "acessorio1");
    cartaAcessorio1();
    definirAcessorio1();

    itemAcessorio2 = $("#itemAcessorio2").val();
    resetarAcessorio2();
    if(itemAcessorio2 != "") {
      switch (itemAcessorio2) {
        case "2913":
          apresidiario("acessorio2");
          break;
        case "28501":
          ckirin("acessorio2");
          break;
        case "2650":
          cmorrigane("acessorio2");
          break;
        case "2651":
          pmorrigane("acessorio2");
          break;
        case "490031":
          cpetal("acessorio2");
          break;
        case "28565":
          moni("acessorio2");
          break;
        case "32205":
          aesmeralda("acessorio2");
          break;
        case "28505":
          acapiroto("acessorio2");
          break;
        case "32243":
          adesbravador("acessorio2");
          break;
        case "28438":
          fada("acessorio2");
          break;
        case "28521":
          pgigante("acessorio2");
          break;
        case "28433":
          cristalazul("acessorio2");
          break;
        case "28411":
          esmeralda("acessorio2");
          break;
        case "28492a":
        case "28492b":
        case "28492c":
        case "28492d":
          diario("acessorio2");
          break;
        case "28531":
          lvigor("acessorio2");
          break;
        case "28491":
          matagi("acessorio2");
          break;
        case "32221":
          astempo("acessorio2");
          break;
        case "28561":
          adraco("acessorio2");
          break;
        case "2655":
          bferro("acessorio2");
          break;
        case "2855":
          rabogp("acessorio2");
          break;
        case "2928a":
          lsorte("acessorio2",1);
          break;
        case "2928b":
          lsorte("acessorio2",0);
          break;
        case "2910":
          bakonawa("acessorio2");
          break;
        default:
          resetarAcessorio2();
      }
    }
    exibirSlots(slotsAcessorio2, "acessorio2");
    cartaAcessorio2();
    definirAcessorio2();

    colorirInput();




    // SOMATORIA DE COISAS

    itemAForca = parseInt($("#itemAForca").val());
    itemBForca = parseInt($("#itemBForca").val());
    itemCForca = parseInt($("#itemCForca").val());
    itemDForca = parseInt($("#itemDForca").val());
    itemEForca = parseInt($("#itemEForca").val());
    itemFForca = parseInt($("#itemFForca").val());
    itemGForca = parseInt($("#itemGForca").val());
    itemHForca = parseInt($("#itemHForca").val());
    itemIForca = parseInt($("#itemIForca").val());

    itemAAgilidade = parseInt($("#itemAAgilidade").val());
    itemBAgilidade = parseInt($("#itemBAgilidade").val());
    itemCAgilidade = parseInt($("#itemCAgilidade").val());
    itemDAgilidade = parseInt($("#itemDAgilidade").val());
    itemEAgilidade = parseInt($("#itemEAgilidade").val());
    itemFAgilidade = parseInt($("#itemFAgilidade").val());
    itemGAgilidade = parseInt($("#itemGAgilidade").val());
    itemHAgilidade = parseInt($("#itemHAgilidade").val());
    itemIAgilidade = parseInt($("#itemIAgilidade").val());

    itemADestreza = parseInt($("#itemADestreza").val());
    itemBDestreza = parseInt($("#itemBDestreza").val());
    itemCDestreza = parseInt($("#itemCDestreza").val());
    itemDDestreza = parseInt($("#itemDDestreza").val());
    itemEDestreza = parseInt($("#itemEDestreza").val());
    itemFDestreza = parseInt($("#itemFDestreza").val());
    itemGDestreza = parseInt($("#itemGDestreza").val());
    itemHDestreza = parseInt($("#itemHDestreza").val());
    itemIDestreza = parseInt($("#itemIDestreza").val());

    itemASorte = parseInt($("#itemASorte").val());
    itemBSorte = parseInt($("#itemBSorte").val());
    itemCSorte = parseInt($("#itemCSorte").val());
    itemDSorte = parseInt($("#itemDSorte").val());
    itemESorte = parseInt($("#itemESorte").val());
    itemFSorte = parseInt($("#itemFSorte").val());
    itemGSorte = parseInt($("#itemGSorte").val());
    itemHSorte = parseInt($("#itemHSorte").val());
    itemISorte = parseInt($("#itemISorte").val());

    nivelPersonagem = parseInt($("#nivelPersonagem").val());

    tempoConjuracaoBase = 1;
    ataqueInvestigar = 0;

    vantagemElemental = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.7,0.5,0,0,1,1,1,1,1,1,1,1,1.5,1.75,2,2,0.9,0.9,0.7,0.6,0.25,0,0,0,1,1,1,1,1.25,1.25,1,0.75,1,1,1,0.75,1,1,1,0.75,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,1,1,1,0.9,0.8,0.7,0.6,1.5,1.75,2,2,1,1,1,1,0.25,0,0,0,1.25,1.25,1,0.75,1,1,1,0.75,1,1,1,0.75,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,1,1,1,1,1,1,1,0.25,0,0,0,1.5,1.75,2,2,0.9,0.8,0.7,0.6,1.25,1.25,1,0.75,1,1,1,0.75,1,1,1,0.75,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,1,1,1,0.25,0,0,0,1,1,1,1,0.9,0.8,0.7,0.6,1.75,1.75,2,2,1,0.75,0.5,0.25,1,1,1,0.75,1,1,1,0.75,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,1,1,1,0.75,0.5,0.25,0,0.75,0.5,0.25,0,0.75,0.5,0.25,0,0.75,0.5,0.25,0,0.75,0.5,0.25,0,0,0,0,0,1.25,1.5,1.75,2,0.75,0.5,0.25,0,1,1.25,1.5,1.75,1,1,1,1,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,0.75,0.5,0.25,1,0.75,0.5,0.25,0.5,0.25,0,0,1.25,1.5,1.75,2,0,0,0,0,0.75,0.5,0.25,0,0,0,0,0,1,1,1,1,1,1,1.25,1.5,1,1,1,0.5,1.25,1.5,1.75,2,1,1,1,1,0,0,0,0,1.5,1.75,2,2,0,0,0,0,1,1.25,1.5,1.75,0,0,0,0,1,1,1,1,1,1,1,0.75,1,1,1,0.75,1,1,1,0.75,1,1,1,0.75,0,0,0,0,1,1,1.25,1.25,0.5,0.25,0,0,1,0.75,0.5,0.25,0.5,0.25,0,0,0.7,0.5,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.75,0.5,0.25,1,1,1,1,1,1,1,1,1.25,1.5,1.75,2,1,1,1,1];

    propriedadeMonstro = parseInt(parseInt($("#propriedadeMonstro").val()) / 10);
    nivelPropriedadeMonstro = parseInt($("#propriedadeMonstro").val()) % 10;
    propriedadeAtaque = parseInt($("#propriedadeAtaque").val());
    if($("#propriedadeConversor").val() != "") { propriedadeAtaque = parseInt($("#propriedadeConversor").val()); }

    posicaoVantagemElemental = (propriedadeMonstro * 40) + (propriedadeAtaque * 4) + nivelPropriedadeMonstro;
    multiplicadorElemental = vantagemElemental[posicaoVantagemElemental];

    somatoriaAcertoCritico = 0;

    itemATaxaCritico = parseInt($("#itemATaxaCritico").val());
    itemBTaxaCritico = parseInt($("#itemBTaxaCritico").val());
    itemCTaxaCritico = parseInt($("#itemCTaxaCritico").val());
    itemDTaxaCritico = parseInt($("#itemDTaxaCritico").val());
    itemETaxaCritico = parseInt($("#itemETaxaCritico").val());
    itemFTaxaCritico = parseInt($("#itemFTaxaCritico").val());
    itemGTaxaCritico = parseInt($("#itemGTaxaCritico").val());
    itemHTaxaCritico = parseInt($("#itemHTaxaCritico").val());
    itemITaxaCritico = parseInt($("#itemITaxaCritico").val());

    itemAAspdPorcentagem = parseInt($("#itemAAspdPorcentagem").val());
    itemBAspdPorcentagem = parseInt($("#itemBAspdPorcentagem").val());
    itemCAspdPorcentagem = parseInt($("#itemCAspdPorcentagem").val());
    itemDAspdPorcentagem = parseInt($("#itemDAspdPorcentagem").val());
    itemEAspdPorcentagem = parseInt($("#itemEAspdPorcentagem").val());
    itemFAspdPorcentagem = parseInt($("#itemFAspdPorcentagem").val());
    itemGAspdPorcentagem = parseInt($("#itemGAspdPorcentagem").val());
    itemHAspdPorcentagem = parseInt($("#itemHAspdPorcentagem").val());
    itemIAspdPorcentagem = parseInt($("#itemIAspdPorcentagem").val());

    itemAAspdFixa = parseInt($("#itemAAspdFixa").val());
    itemBAspdFixa = parseInt($("#itemBAspdFixa").val());
    itemCAspdFixa = parseInt($("#itemCAspdFixa").val());
    itemDAspdFixa = parseInt($("#itemDAspdFixa").val());
    itemEAspdFixa = parseInt($("#itemEAspdFixa").val());
    itemFAspdFixa = parseInt($("#itemFAspdFixa").val());
    itemGAspdFixa = parseInt($("#itemGAspdFixa").val());
    itemHAspdFixa = parseInt($("#itemHAspdFixa").val());
    itemIAspdFixa = parseInt($("#itemIAspdFixa").val());

    itemAIgnorarDefesa = parseInt($("#itemAIgnorarDefesa").val());
    itemBIgnorarDefesa = parseInt($("#itemBIgnorarDefesa").val());
    itemCIgnorarDefesa = parseInt($("#itemCIgnorarDefesa").val());
    itemDIgnorarDefesa = parseInt($("#itemDIgnorarDefesa").val());
    itemEIgnorarDefesa = parseInt($("#itemEIgnorarDefesa").val());
    itemFIgnorarDefesa = parseInt($("#itemFIgnorarDefesa").val());
    itemGIgnorarDefesa = parseInt($("#itemGIgnorarDefesa").val());
    itemHIgnorarDefesa = parseInt($("#itemHIgnorarDefesa").val());
    itemIIgnorarDefesa = parseInt($("#itemIIgnorarDefesa").val());

    itemAAtaque = parseInt($("#itemAAtaque").val());
    itemBAtaque = parseInt($("#itemBAtaque").val());
    itemCAtaque = parseInt($("#itemCAtaque").val());
    itemDAtaque = parseInt($("#itemDAtaque").val());
    itemEAtaque = parseInt($("#itemEAtaque").val());
    itemEAtaqueEquipamento = parseInt($("#itemEAtaqueEquipamento").val());
    itemFAtaque = parseInt($("#itemFAtaque").val());
    itemGAtaque = parseInt($("#itemGAtaque").val());
    itemHAtaque = parseInt($("#itemHAtaque").val());
    itemIAtaque = parseInt($("#itemIAtaque").val());
    itemJAtaque = parseInt($("#itemJAtaque").val());
    flechaAtaque = parseInt($("#flechaAtaque").val());

    itemAAtaqueArmaPorcentagem = parseInt($("#itemAAtaqueArmaPorcentagem").val());
    itemBAtaqueArmaPorcentagem = parseInt($("#itemBAtaqueArmaPorcentagem").val());
    itemCAtaqueArmaPorcentagem = parseInt($("#itemCAtaqueArmaPorcentagem").val());
    itemDAtaqueArmaPorcentagem = parseInt($("#itemDAtaqueArmaPorcentagem").val());
    itemEAtaqueArmaPorcentagem = parseInt($("#itemEAtaqueArmaPorcentagem").val());
    itemFAtaqueArmaPorcentagem = parseInt($("#itemFAtaqueArmaPorcentagem").val());
    itemGAtaqueArmaPorcentagem = parseInt($("#itemGAtaqueArmaPorcentagem").val());
    itemHAtaqueArmaPorcentagem = parseInt($("#itemHAtaqueArmaPorcentagem").val());
    itemIAtaqueArmaPorcentagem = parseInt($("#itemIAtaqueArmaPorcentagem").val());

    itemADanoFisico = parseInt($("#itemADanoFisico").val());
    itemBDanoFisico = parseInt($("#itemBDanoFisico").val());
    itemCDanoFisico = parseInt($("#itemCDanoFisico").val());
    itemDDanoFisico = parseInt($("#itemDDanoFisico").val());
    itemEDanoFisico = parseInt($("#itemEDanoFisico").val());
    itemFDanoFisico = parseInt($("#itemFDanoFisico").val());
    itemGDanoFisico = parseInt($("#itemGDanoFisico").val());
    itemHDanoFisico = parseInt($("#itemHDanoFisico").val());
    itemIDanoFisico = parseInt($("#itemIDanoFisico").val());

    /*
    itemADanoFisicoMonstro = parseInt($("#itemADanoFisicoMonstro").val());
    itemBDanoFisicoMonstro = parseInt($("#itemBDanoFisicoMonstro").val());
    itemCDanoFisicoMonstro = parseInt($("#itemCDanoFisicoMonstro").val());
    itemDDanoFisicoMonstro = parseInt($("#itemDDanoFisicoMonstro").val());
    itemEDanoFisicoMonstro = parseInt($("#itemEDanoFisicoMonstro").val());
    itemFDanoFisicoMonstro = parseInt($("#itemFDanoFisicoMonstro").val());
    itemGDanoFisicoMonstro = parseInt($("#itemGDanoFisicoMonstro").val());
    itemHDanoFisicoMonstro = parseInt($("#itemHDanoFisicoMonstro").val());
    itemIDanoFisicoMonstro = parseInt($("#itemIDanoFisicoMonstro").val());
    */

    itemADanoMVP = parseInt($("#itemADanoMVP").val());
    itemBDanoMVP = parseInt($("#itemBDanoMVP").val());
    itemCDanoMVP = parseInt($("#itemCDanoMVP").val());
    itemDDanoMVP = parseInt($("#itemDDanoMVP").val());
    itemEDanoMVP = parseInt($("#itemEDanoMVP").val());
    itemFDanoMVP = parseInt($("#itemFDanoMVP").val());
    itemGDanoMVP = parseInt($("#itemGDanoMVP").val());
    itemHDanoMVP = parseInt($("#itemHDanoMVP").val());
    itemIDanoMVP = parseInt($("#itemIDanoMVP").val());

    itemADanoDistancia = parseInt($("#itemADanoDistancia").val());
    itemBDanoDistancia = parseInt($("#itemBDanoDistancia").val());
    itemCDanoDistancia = parseInt($("#itemCDanoDistancia").val());
    itemDDanoDistancia = parseInt($("#itemDDanoDistancia").val());
    itemEDanoDistancia = parseInt($("#itemEDanoDistancia").val());
    itemFDanoDistancia = parseInt($("#itemFDanoDistancia").val());
    itemGDanoDistancia = parseInt($("#itemGDanoDistancia").val());
    itemHDanoDistancia = parseInt($("#itemHDanoDistancia").val());
    itemIDanoDistancia = parseInt($("#itemIDanoDistancia").val());

    itemADanoCriticoPorcentagem = parseInt($("#itemADanoCriticoPorcentagem").val());
    itemBDanoCriticoPorcentagem = parseInt($("#itemBDanoCriticoPorcentagem").val());
    itemCDanoCriticoPorcentagem = parseInt($("#itemCDanoCriticoPorcentagem").val());
    itemDDanoCriticoPorcentagem = parseInt($("#itemDDanoCriticoPorcentagem").val());
    itemEDanoCriticoPorcentagem = parseInt($("#itemEDanoCriticoPorcentagem").val());
    itemFDanoCriticoPorcentagem = parseInt($("#itemFDanoCriticoPorcentagem").val());
    itemGDanoCriticoPorcentagem = parseInt($("#itemGDanoCriticoPorcentagem").val());
    itemHDanoCriticoPorcentagem = parseInt($("#itemHDanoCriticoPorcentagem").val());
    itemIDanoCriticoPorcentagem = parseInt($("#itemIDanoCriticoPorcentagem").val());

    itemADanoRacial = parseInt($("#itemADanoRacial").val());
    itemBDanoRacial = parseInt($("#itemBDanoRacial").val());
    itemCDanoRacial = parseInt($("#itemCDanoRacial").val());
    itemDDanoRacial = parseInt($("#itemDDanoRacial").val());
    itemEDanoRacial = parseInt($("#itemEDanoRacial").val());
    itemFDanoRacial = parseInt($("#itemFDanoRacial").val());
    itemGDanoRacial = parseInt($("#itemGDanoRacial").val());
    itemHDanoRacial = parseInt($("#itemHDanoRacial").val());
    itemIDanoRacial = parseInt($("#itemIDanoRacial").val());

    itemADanoPropriedade = parseInt($("#itemADanoPropriedade").val());
    itemBDanoPropriedade = parseInt($("#itemBDanoPropriedade").val());
    itemCDanoPropriedade = parseInt($("#itemCDanoPropriedade").val());
    itemDDanoPropriedade = parseInt($("#itemDDanoPropriedade").val());
    itemEDanoPropriedade = parseInt($("#itemEDanoPropriedade").val());
    itemFDanoPropriedade = parseInt($("#itemFDanoPropriedade").val());
    itemGDanoPropriedade = parseInt($("#itemGDanoPropriedade").val());
    itemHDanoPropriedade = parseInt($("#itemHDanoPropriedade").val());
    itemIDanoPropriedade = parseInt($("#itemIDanoPropriedade").val());

    itemADanoTamanho = parseInt($("#itemADanoTamanho").val());
    itemBDanoTamanho = parseInt($("#itemBDanoTamanho").val());
    itemCDanoTamanho = parseInt($("#itemCDanoTamanho").val());
    itemDDanoTamanho = parseInt($("#itemDDanoTamanho").val());
    itemEDanoTamanho = parseInt($("#itemEDanoTamanho").val());
    itemFDanoTamanho = parseInt($("#itemFDanoTamanho").val());
    itemGDanoTamanho = parseInt($("#itemGDanoTamanho").val());
    itemHDanoTamanho = parseInt($("#itemHDanoTamanho").val());
    itemIDanoTamanho = parseInt($("#itemIDanoTamanho").val());

    hardDEF = parseInt($("#hardDEF").val());

    if($("#tamanho").val() == "0" || $("#tamanho").val() == "1") reducaoTamanho = 1; if($("#tamanho").val() == "2") reducaoTamanho = 0.75;
    if($("#cartaArco1").val() == "4137" || $("#cartaArco2").val() == "4137" || $("#sobren-e1").val() == "sobren-e1-drake") { reducaoTamanho = 1; }

    somatoriaItensIgnorarDefesa = itemAIgnorarDefesa + itemBIgnorarDefesa + itemCIgnorarDefesa + itemDIgnorarDefesa + itemEIgnorarDefesa + itemFIgnorarDefesa + itemGIgnorarDefesa + itemHIgnorarDefesa + itemIIgnorarDefesa;
    if(somatoriaItensIgnorarDefesa > 100) { somatoriaItensIgnorarDefesa = 100; }
    somatoriaItensIgnorarDefesa = 1 - (somatoriaItensIgnorarDefesa / 100);
    defesaMonstroIgnorada = hardDEF * somatoriaItensIgnorarDefesa;
    if($("#cartaArco1").val() == "4399" || $("#cartaArco2").val() == "4399") { ataqueInvestigar = defesaMonstroIgnorada / 2; defesaMonstroIgnorada = 0; }
    reducaoDanoMostro = (4000 + defesaMonstroIgnorada) / (4000 + (defesaMonstroIgnorada * 10));
    somatoriaItensAtaque = itemAAtaque + itemBAtaque + itemCAtaque + itemDAtaque + itemEAtaqueEquipamento + itemFAtaque + itemGAtaque + itemHAtaque + itemIAtaque;
    somatoriaItensAtaquePorcentagem = 1 + ((itemAAtaqueArmaPorcentagem + itemBAtaqueArmaPorcentagem + itemCAtaqueArmaPorcentagem + itemDAtaqueArmaPorcentagem + itemEAtaqueArmaPorcentagem + itemFAtaqueArmaPorcentagem + itemGAtaqueArmaPorcentagem + itemHAtaqueArmaPorcentagem + itemIAtaqueArmaPorcentagem) / 100);
    somatoriaItensDanoFisico = 1 + ((itemADanoFisico + itemBDanoFisico + itemCDanoFisico + itemDDanoFisico + itemEDanoFisico + itemFDanoFisico + itemGDanoFisico + itemHDanoFisico + itemIDanoFisico) / 100);
    /* somatoriaItensDanoFisicoMonstro = 1 + ((itemADanoFisicoMonstro + itemBDanoFisicoMonstro + itemCDanoFisicoMonstro + itemDDanoFisicoMonstro + itemEDanoFisicoMonstro + itemFDanoFisicoMonstro + itemGDanoFisicoMonstro + itemHDanoFisicoMonstro + itemIDanoFisicoMonstro) / 100); */
    somatoriaItensDanoMVP = 1 + ((itemADanoMVP + itemBDanoMVP + itemCDanoMVP + itemDDanoMVP + itemEDanoMVP + itemFDanoMVP + itemGDanoMVP + itemHDanoMVP + itemIDanoMVP) / 100);
    if(!$("#chefe").is(":checked")) somatoriaItensDanoMVP = 1;
    somatoriaItensDanoDistancia = 1 + ((itemADanoDistancia + itemBDanoDistancia + itemCDanoDistancia + itemDDanoDistancia + itemEDanoDistancia + itemFDanoDistancia + itemGDanoDistancia + itemHDanoDistancia + itemIDanoDistancia) / 100);
    somatoriaItensDanoCritico = 1 + ((itemADanoCriticoPorcentagem + itemBDanoCriticoPorcentagem + itemCDanoCriticoPorcentagem + itemDDanoCriticoPorcentagem + itemEDanoCriticoPorcentagem + itemFDanoCriticoPorcentagem + itemGDanoCriticoPorcentagem + itemHDanoCriticoPorcentagem + itemIDanoCriticoPorcentagem) / 100);
    somatoriaItensDanoRacial = 1 + ((itemADanoRacial + itemBDanoRacial + itemCDanoRacial + itemDDanoRacial + itemEDanoRacial + itemFDanoRacial + itemGDanoRacial + itemHDanoRacial + itemIDanoRacial) / 100);
    somatoriaItensDanoPropriedade = 1 + ((itemADanoPropriedade + itemBDanoPropriedade + itemCDanoPropriedade + itemDDanoPropriedade + itemEDanoPropriedade + itemFDanoPropriedade + itemGDanoPropriedade + itemHDanoPropriedade + itemIDanoPropriedade) / 100);
    somatoriaItensDanoTamanho = 1 + ((itemADanoTamanho + itemBDanoTamanho + itemCDanoTamanho + itemDDanoTamanho + itemEDanoTamanho + itemFDanoTamanho + itemGDanoTamanho + itemHDanoTamanho + itemIDanoTamanho) / 100);
    somatoriaItensAspdPorcentagem = itemAAspdPorcentagem + itemBAspdPorcentagem + itemCAspdPorcentagem + itemDAspdPorcentagem + itemEAspdPorcentagem + itemFAspdPorcentagem + itemGAspdPorcentagem + itemHAspdPorcentagem + itemIAspdPorcentagem;
    somatoriaItensAspdFixa = itemAAspdFixa + itemBAspdFixa + itemCAspdFixa + itemDAspdFixa + itemEAspdFixa + itemFAspdFixa + itemGAspdFixa + itemHAspdFixa + itemIAspdFixa;

    bonusFor = bonusClasseFor[parseInt($("#nivelClasse").val())] + itemAForca + itemBForca + itemCForca + itemDForca + itemEForca + itemFForca + itemGForca + itemHForca + itemIForca;
    bonusAgi = bonusClasseAgi[parseInt($("#nivelClasse").val())] + itemAAgilidade + itemBAgilidade + itemCAgilidade + itemDAgilidade + itemEAgilidade + itemFAgilidade + itemGAgilidade + itemHAgilidade + itemIAgilidade;
    bonusVit = bonusClasseVit[parseInt($("#nivelClasse").val())];
    bonusInt = bonusClasseInt[parseInt($("#nivelClasse").val())];
    bonusDes = bonusClasseDes[parseInt($("#nivelClasse").val())] + itemADestreza + itemBDestreza + itemCDestreza + itemDDestreza + itemEDestreza + itemFDestreza + itemGDestreza + itemHDestreza + itemIDestreza;
    bonusSor = bonusClasseSor[parseInt($("#nivelClasse").val())] + itemASorte + itemBSorte + itemCSorte + itemDSorte + itemESorte + itemFSorte + itemGSorte + itemHSorte + itemISorte;

    // Consumíveis
    somatoriaConsumiveisAtaque = 0;
    if($("#furia").is(":checked")) { somatoriaItensAspdPorcentagem += 20; } else { if($("#despertar").is(":checked")) { somatoriaItensAspdPorcentagem += 15; } else { if($("#concentracao").is(":checked")) { somatoriaItensAspdPorcentagem += 10; } } }
    if($("#sucocelular").is(":checked")) { somatoriaItensAspdPorcentagem += 10; }
    if($("#acaraje").is(":checked")) { somatoriaItensAspdPorcentagem += 10; }
    if($("#pouro").is(":checked")) { somatoriaItensAspdPorcentagem += 3; }
    if($("#churrasco").is(":checked")) { bonusFor += 20; }
    if($("#drosera").is(":checked")) { bonusAgi += 20; }
    if($("#siroma").is(":checked")) { bonusDes += 20; }
    if($("#petite").is(":checked")) { bonusSor += 20; }
    if($("#acucarado").is(":checked")) { somatoriaItensAspdPorcentagem += 25; }
    if($("#guarana").is(":checked")) { if(!$("#pagilidade").is(":checked")) { bonusAgi += 7; } $("#concentracao").prop("checked", true); }
    if($("#abrasivo").is(":checked")) { somatoriaAcertoCritico += 30; }
    if($("#arunafeltz").is(":checked")) { somatoriaAcertoCritico += 7; }
    if($("#sobremesa").is(":checked")) { somatoriaAcertoCritico += 7; }
    if($("#furorf").is(":checked")) { somatoriaConsumiveisAtaque += 50; }
    if($("#bolinhod").is(":checked")) { bonusFor += 10; bonusAgi += 10; bonusDes += 10; bonusSor += 10; somatoriaConsumiveisAtaque += 30; }
    if($("#realgar").is(":checked")) { somatoriaConsumiveisAtaque += 30; }
    if($("#rubro").is(":checked")) { somatoriaConsumiveisAtaque += 30; }
    if($("#plaranja").is(":checked")) { if(!$("#churrasco").is(":checked")) { bonusFor += 15; } somatoriaConsumiveisAtaque += parseInt(Math.random() * 101) + 11; }
    if($("#pbaunilha").is(":checked")) { if(!$("#drosera").is(":checked")) { bonusAgi += 15; } }
    if($("#plimao").is(":checked")) { if(!$("#siroma").is(":checked")) { bonusDes += 15; } }
    if($("#pmorango").is(":checked")) { if(!$("#petite").is(":checked")) { bonusSor += 15; } somatoriaAcertoCritico += parseInt(Math.random() * 23) + 11; }
    if($("#btyr").is(":checked")) { somatoriaConsumiveisAtaque += 20; }
    if($("#pbencao").is(":checked")) { bonusFor += 10; bonusDes += 10; }
    if($("#pagilidade").is(":checked")) { bonusAgi += 12; }
    if($("#ptransfray").is(":checked")) { somatoriaItensDanoDistancia += 0.25; if(selectAlterado.is("#ptransfray")) $("#ptransfdev, #ptransfpor").prop("checked", false); }
    if($("#ptransfdev").is(":checked")) { somatoriaItensAspdFixa += 1; if(selectAlterado.is("#ptransfdev")) $("#ptransfray, #ptransfpor").prop("checked", false); }
    if($("#ptransfpor").is(":checked")) { somatoriaItensDanoCritico += 0.05; if(selectAlterado.is("#ptransfpor")) $("#ptransfray, #ptransfdev").prop("checked", false); }

    $("#bonusFor").val("+" + bonusFor);
    $("#bonusAgi").val("+" + bonusAgi);
    $("#bonusVit").val("+" + bonusVit);
    $("#bonusInt").val("+" + bonusInt);
    $("#bonusDes").val("+" + bonusDes);
    $("#bonusSor").val("+" + bonusSor);

    FOR = parseInt($("#for").val()) + bonusFor;
    AGI = parseInt($("#agi").val()) + bonusAgi;
    VIT = parseInt($("#vit").val()) + bonusVit;
    INT = parseInt($("#int").val()) + bonusInt;
    DES = parseInt($("#des").val()) + bonusDes;
    SOR = parseInt($("#sor").val()) + bonusSor;

    StatusATK = Math.floor(Math.floor(nivelPersonagem / 4) + DES + Math.floor(FOR / 5) + Math.floor(SOR / 3));
    WeaponATK = Math.floor(((itemEAtaque) + Math.floor(itemEAtaque * Math.floor(DES / 200))) * reducaoTamanho); // removed Variance and OverUpgradeBonus
    ExtraATK = somatoriaItensAtaque + flechaAtaque + somatoriaConsumiveisAtaque; // removed PseudoBuffATK

    danoCausado = Math.floor(Math.floor(Math.floor(Math.floor((((StatusATK * 2)) + Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(WeaponATK * somatoriaItensAtaquePorcentagem) + ExtraATK + itemJAtaque + ataqueInvestigar) * multiplicadorElemental) * somatoriaItensDanoFisico) * somatoriaItensDanoMVP) * somatoriaItensDanoRacial) * somatoriaItensDanoPropriedade) * somatoriaItensDanoTamanho)) * somatoriaItensDanoDistancia) * 1.4) * somatoriaItensDanoCritico) * reducaoDanoMostro);

    contadorMudancas++;

    if(contadorMudancas % 40 == 0 && contadorMudancas != 0) $("#monster-image .balloon").show();

    // Preparação de propriedade para dano do Impatco Explosivo
    posicaoVantagemElemental = (propriedadeMonstro * 40) + (3 * 4) + nivelPropriedadeMonstro;
    multiplicadorElemental = vantagemElemental[posicaoVantagemElemental];

    bonusImpactoExplosivo = 0;
    if($("#cartaArco1").val() == "4305b" || $("#cartaArco2").val() == "4305b") {
      bonusImpactoExplosivo = danoCausado * multiplicadorElemental * 0.2;
    }

    frenesi = 0; forcaViolentissima = 0;
    if($("#itemAcessorio1").val() == "28492b" || $("#itemAcessorio1").val() == "28492d" || $("#itemAcessorio2").val() == "28492b" || $("#itemAcessorio2").val() == "28492d" || (($("#cartaMeio").val() == "4143" || $("#cartaTopo").val() == "4143") && $("#itemTopo").val() == "400006")) { forcaViolentissima = 1; }
    if($("#itemAcessorio1").val() == "28492c" || $("#itemAcessorio1").val() == "28492d" || $("#itemAcessorio2").val() == "28492c" || $("#itemAcessorio2").val() == "28492d" || $("#itemTopo").val() == "4357" || $("#itemMeio").val() == "4357") { frenesi = 2; }
    bonusFrenesiForcaViolentissima = 1 + frenesi + forcaViolentissima;

    danoCausadoFinal = Math.floor((danoCausado * bonusFrenesiForcaViolentissima) + bonusImpactoExplosivo);

    somatoriaAcertoCritico += Math.floor(1 + (SOR / 3)) + itemATaxaCritico + itemBTaxaCritico + itemCTaxaCritico + itemDTaxaCritico + itemETaxaCritico + itemFTaxaCritico + itemGTaxaCritico + itemHTaxaCritico + itemITaxaCritico;
    $("#taxacritico").val(somatoriaAcertoCritico);


    // ASPD
    aspdPenalty = 1 - ( jobASPD - 144 ) / 50;
    var aspdCorrection = 0;
    if ( AGI < 205 ) { aspdCorrection = ( Math.sqrt( 205 ) - Math.sqrt( AGI ) ) / 7.15; }
    statASPD = Math.sqrt( ( AGI * 9.9987 ) + ( DES * 0.1922 ) );
    var aspdMultiplier = 0;
    if($("#itemAcessorio1").val() == "28492c" || $("#itemAcessorio1").val() == "28492d" || $("#itemAcessorio2").val() == "28492c" || $("#itemAcessorio2").val() == "28492d") { aspdMultiplier += 30; }
    aspdMultiplier = ( 100 - aspdMultiplier ) / 100;
    AspdFinal = ( 200 - ( 200 - ( jobASPD - aspdCorrection + statASPD * aspdPenalty ) ) * aspdMultiplier );
    percentAspdEquipment = (195 - AspdFinal) * (somatoriaItensAspdPorcentagem / 100);
    AspdFinal += percentAspdEquipment
    AspdFinal += somatoriaItensAspdFixa;
    AspdFinal = Math.min(AspdFinal, 193);
    $("#aspd").val(AspdFinal.toFixed(2));

    calcularPontosAtributo();

    var vaiQuebrar = "nao";
    if($("#itemAcessorio1").val() == "28492b" || $("#itemAcessorio1").val() == "28492d" || $("#itemAcessorio2").val() == "28492b" || $("#itemAcessorio2").val() == "28492d" || (($("#cartaMeio").val() == "4143" || $("#cartaTopo").val() == "4143") && $("#itemTopo").val() == "400006")) vaiQuebrar = "sim";
    if($("#prevestirarma").prop("checked") == true || $("#cartaArco1").val() == "4407" || $("#cartaArco1").val() == "4072" || $("#cartaArco2").val() == "4407" || $("#cartaArco2").val() == "4072" || $("#sobren-e1").val() == "sobren-e1-golem") { vaiQuebrar = "nao"; }

    if(vaiQuebrar == "sim") {
      var golpesPraQuebrar = 0;
      var seraQueQuebrou = false;
      do {
        golpesPraQuebrar++;
        chance = Math.random();
        if(chance <= 0.001) { seraQueQuebrou = true; }
      }while(seraQueQuebrou == false);
      $("#danofinal").val("Nada");
      $("#armaquebrada").text("Arma quebrou depois de " + golpesPraQuebrar + " ataques :(");
    } else {
      $("#danofinal").val(danoCausadoFinal);
      $("#armaquebrada").text("");
    }

    $("select").each(function() {
      let selectId = $(this).attr("id");
      let selectOption = $(this).find("option:selected").attr("value");
      let selectText = $(this).find("option:selected").text();
      let optionsTextColor = $(this).css("color");
      if($(this).is(":disabled")) { $(".select-group[select-target='" + selectId + "']").addClass("disabled"); } else { $(".select-group[select-target='" + selectId + "']").removeClass("disabled"); }
      $(".select-group[select-target='" + selectId + "'] > span").css("color", optionsTextColor);
      $(".select-group[select-target='" + selectId + "'] > span").text(selectText);
      $(".select-group[select-target='" + selectId + "'] .select-options span").removeClass("active");
      $(".select-group[select-target='" + selectId + "'] .select-options span[value='" + selectOption + "']").addClass("active");
    });

  });

  $(document).ready(function() {
    $("#agi").trigger("change");
  });

  $(".columns.toHide table").each(function() {
    $(this).find("tr").not(".alwaysShow").css("display","none");
    $(this).find("tr.bonusItem").first().before("<tr class='alwaysShow showhide'><th colspan='12'><input type='button' value='+ mostrar bônus' class='escondendo'></td></tr>");
  });

  $(".showhide input, .showhideImage").click(function() {
    var element = $(this).closest("table");
    if(element.find(".showhide input").hasClass("escondendo")) {
      element.find("tr").not(".alwaysShow").css("display","table-row");
      element.find(".showhideImage").addClass("mostrando").removeClass("escondendo");
      element.find(".showhide input").addClass("mostrando").removeClass("escondendo");
      element.find(".showhide input").val(element.find(".showhide input").val().replace("+ mostrar","- esconder"))
    } else {
      element.find("tr").not(".alwaysShow").css("display","none");
      element.find(".showhideImage").addClass("escondendo").removeClass("mostrando");
      element.find(".showhide input").addClass("escondendo").removeClass("mostrando");
      element.find(".showhide input").val(element.find(".showhide input").val().replace("- esconder","+ mostrar"))
    }
  });


});
