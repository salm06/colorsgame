var myJson = {"years":[{"name":"2016","months":[{"name":"Aprile","budget_iniziale":"20.00","bets":[{"day":"26","index":"0.7","amount":"8.00","win":"22.80","result":0,"events":[{"title":"Manchester City - Real Madrid","type":"2 + Over 1,5","quote":"2.85"}],"quote_total":"2.85"},{"day":"26","index":"0.5","amount":"2.00","win":"24.00","result":0,"events":[{"title":"Manchester City - Real Madrid","type":"0-2","quote":"12.00"}],"quote_total":"12.00"},{"day":"26","index":"0.5","amount":"2.00","win":"24.00","result":0,"events":[{"title":"Manchester City - Real Madrid","type":"0-2","quote":"12.00"}],"quote_total":"12.00"}]}]}]}
var won = 0;
var lost = 0;
var tot = 0;
var won_percentage = "";
var lost_percentage = "";
var money_won = 0.0;
var money_lost = 0.0;
var money_potential = 0.0;
var starting_budget = 0.0;

function populatePage(){
	for( var y = 0; y < myJson.years.length; y++) {
		for( var m = 0; m < myJson.years[y].months.length; m++){
						//Main containers of the page
						var div_month_wrap= $(".month_list").eq(0)
						var div_month_title= $(document.createElement("div"))
						var div_month_content= $(document.createElement("div"))
						var div_month_heading= $(document.createElement("div"))
						

						//Build the header of the table
						var div_head_day = $(document.createElement("div")).addClass("day").html("Day")
						var div_head_result = $(document.createElement("div")).addClass("Risultato")
						var div_head_title = $(document.createElement("div")).addClass("title").html("Evento")
						var div_head_type = $(document.createElement("div")).addClass("type").html("Tipo")
						var div_head_quote = $(document.createElement("div")).addClass("win").html("Quota")
						var div_head_win = $(document.createElement("div")).addClass("win").html("Vincita")
						var div_head_info = $(document.createElement("div")).addClass("Info")

						div_month_heading.addClass("head").append(div_head_result, div_head_day, div_head_title, div_head_type, div_head_quote, div_head_win, div_head_info)
						div_month_content.addClass("content table").append(div_month_heading)

						//Starting populating with bets
						for (var b = 0; b < myJson.years[y].months[m].bets.length; b++) {
							var div_bet = $(document.createElement("div")).addClass("bet row_" + b%2).attr("id","bet_"+b)
							var div_bet_result = $(document.createElement("div")).addClass("result res_"+myJson.years[y].months[m].bets[b].result)
							var div_bet_day = $(document.createElement("div")).addClass("day").html(myJson.years[y].months[m].bets[b].day + "<span>"+myJson.years[y].months[m].name+"</span>")
							var div_bet_title = $(document.createElement("div")).addClass("title").html(myJson.years[y].months[m].bets[b].title)
							var div_bet_type = $(document.createElement("div")).addClass("type").html(myJson.years[y].months[m].bets[b].type)
							var div_bet_quote = $(document.createElement("div")).addClass("type").html(myJson.years[y].months[m].bets[b].quote_total)
							var div_bet_win = $(document.createElement("div")).addClass("win").html("€"+myJson.years[y].months[m].bets[b].win.replace(".",","))
							var div_bet_info = $(document.createElement("div")).addClass("info")

							div_bet.append(div_bet_result, div_bet_day, div_bet_title, div_bet_type, div_bet_quote, div_bet_win, div_bet_info)
							div_month_content.append(div_bet)

							//Check if Win or Lose
							if(myJson.years[y].months[m].bets[b].result === 0) {
								lost++;
								money_lost += parseFloat(myJson.years[y].months[m].bets[b].amount)
							} else {
								won++
								money_won += parseFloat(myJson.years[y].months[m].bets[b].win);
							}

							//Start building popups							
							var div_events_details = $(document.createElement("div")).addClass("hide events_details bet_"+b)
							var div_popup_result = $(document.createElement("div")).addClass("popup_result res_"+myJson.years[y].months[m].bets[b].result).html("√")

							var div_event_cont = $(document.createElement("div")).addClass("container")
							var div_event_heading= $(document.createElement("div"))
							var div_event_head_title = $(document.createElement("div")).addClass("title").html("Evento")
							var div_event_head_type = $(document.createElement("div")).addClass("type").html("Tipo")
							var div_event_head_quote = $(document.createElement("div")).addClass("win").html("Quota")

							//Create the heading of the panel
							div_event_heading.addClass("head").append(div_event_head_title, div_event_head_type, div_event_head_quote)
							div_event_cont.append(div_event_heading)
							div_events_details.append(div_popup_result)

							if(myJson.years[y].months[m].bets[b].events.length > 1) {
								var events_type_varius = false;
								var past_type = "";
								for (var e = 0; e < myJson.years[y].months[m].bets[b].events.length; e++) {
									var curr_event = myJson.years[y].months[m].bets[b].events[e]
									var div_event = $(document.createElement("div")).addClass("event bet_"+b+" event_"+e).attr("id","bet_"+b+"_event_"+e)
									var div_event_result = $(document.createElement("div")).addClass("result")
									var div_event_day = $(document.createElement("div")).addClass("day")
									var div_event_title = $(document.createElement("div")).addClass("title").html(curr_event.title)
									var div_event_type = $(document.createElement("div")).addClass("type").html(curr_event.type)
									var div_event_quote = $(document.createElement("div")).addClass("quote").html(curr_event.quote)
									var div_event_win = $(document.createElement("div")).addClass("win").html("€"+myJson.years[y].months[m].bets[b].win.replace(".",","))
									var div_event_info = $(document.createElement("div"))

									if(past_type == curr_event.type) {
										events_type_varius = false
									} else {
										events_type_varius = true;
										console.log("HEZ")
									}
									past_type = curr_event.type;

									div_bet_title.html("Multipla")
									
									if(events_type_varius) {
										div_bet_type.html("Vario")
									} else {
										div_bet_type.html(curr_event.type)
									}
									//Create the event
									div_event.addClass("row_" + e%2).append(div_event_title, div_event_type, div_event_quote)

									//Appending the events in the container
									div_event_cont.append(div_event)
									
								}
							} else {
								var curr_event = myJson.years[y].months[m].bets[b].events[0]
								var div_event = $(document.createElement("div")).addClass("event bet_"+b+" event_0").attr("id","bet_"+b+"_event_0")
								var div_event_result = $(document.createElement("div")).addClass("result")
								var div_event_day = $(document.createElement("div")).addClass("day")
								var div_event_title = $(document.createElement("div")).addClass("title").html(curr_event.title)
								var div_event_type = $(document.createElement("div")).addClass("type").html(curr_event.type)
								var div_event_quote = $(document.createElement("div")).addClass("result res_"+myJson.years[y].months[m].bets[b].quote)
								var div_event_win = $(document.createElement("div")).addClass("win").html("€"+myJson.years[y].months[m].bets[b].win.replace(".",","))
								var div_event_info = $(document.createElement("div"))
								div_bet_title.html(myJson.years[y].months[m].bets[b].events[0].title)
								div_bet_type.html(myJson.years[y].months[m].bets[b].events[0].type)

								div_event.append(div_event_title, div_event_type, div_event_quote)
								div_event_cont.append(div_event)
							}
							div_events_details.append(div_event_cont)
							div_month_content.append(div_events_details)


							

							
							tot++;
						};
						starting_budget = parseFloat(myJson.years[y].months[m].budget_iniziale);
						money_potential = money_lost + money_won - starting_budget
						won_percentage = won*100/tot
						lost_percentage = lost*100/tot
						$("#page_title").html(myJson.years[y].months[0].name)
						div_month_title.addClass("title").html(myJson.years[y].months[m].name)
						div_month_title.attr("id",myJson.years[y].months[m].name + "_" + myJson.years[y].name)
						div_month_wrap.append(div_month_content)

						// GENERATE ALL THE DATA
						var div_month_data = $(".month_data").eq(0)
						var div_col1 = $(".month_data .col1").eq(0)
						var div_col2 = $(".month_data .col2").eq(0)
						var div_starting_budget = $(document.createElement("div")).addClass("starting_amount").html("€"+myJson.years[y].months[m].budget_iniziale)
						var div_progress = $(document.createElement("div")).addClass("percentage_lose_win").html("<div class='won'><div>Vinte</div><div class='number'>"+won+"</div></div><div class='lost'><div>Perse</div><div class='number'>"+lost+"</div></div><div class='clear'></div>")
						var div_progress_percentage = $(document.createElement("div")).addClass("percentage_lose_win").html("<div><div class='left'>"+Math.round(won_percentage)+"% - Vinte</div><div class='right'>"+Math.round(lost_percentage)+"% - Perse</div><div class='clear'></div></div><div class='background'><div class='fill' style='width: "+won_percentage+"%;'></div></div>")

						div_col1.append("<div class='money'><div class='text'>Il tuo saldo</div><div class='amount'>€"+money_won.toString().substring(0,5)+"</div><div class='clear'></div></div>")
						div_col1.append("<div class='money_lose_win table'><div class='cell starting'><div class='text'>Budget Iniziale</div><div class='number'>€"+starting_budget+"</div></div><div class='cell won'><div class='text'>Budget Attuale</div><div class='number'>€"+(money_won + starting_budget - money_lost).toString().substring(0,5)+"</div></div><div class='cell lost'><div class='lost'><div class='text'>Scommesse Perse</div><div class='number'>€"+money_lost.toString().substring(0,5)+"</div></div></div><div class='cell total'><div class='text'>Guadagno Effettivo</div><div class='number'>€"+(money_won - money_lost).toString().substring(0,5)+"</div></div>")
						div_col1.append(div_progress)

						var div_percentage_plus = $(document.createElement("div")).addClass("percentage_plus").html("<div class='plus'><div>Guadagno</div><div class='number'>"+parseInt((money_won - money_lost)*100/starting_budget)+"%</div></div>")
						div_col2.append(div_percentage_plus)

						div_col2.append(div_progress_percentage)

					}
				}
			}