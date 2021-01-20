 const Discord = require('discord.js');
 
  const fs = require('fs');
  

  const bot = new Discord.Client()

 //let sauvegardes2 = bot.channels.cache.get('728620845001343070').
 //let exps = ('ll')
 //let prefixes = 
 //let sauvegardes = 

 //fs.writeFile('sauvegarde.json', JSON.stringify(sauvegardes), (err) => {
  //if (err) throw err;
//})
 //fs.writeFile('prefixes.json', JSON.stringify(prefixes), (err) => {
  //if (err) throw err;
//})
 //fs.writeFile('exp.json', JSON.stringify(exps), (err) => {
  //if (err) throw err;
//})
 //fs.writeFile('sauvegarde2.json', JSON.stringify(sauvegardes2), (err) => {
  //if (err) throw err;
//})

  const yt = require('ytdl-core')
  
  const ms = require('ms')
  const monnai = require('./message.json')
  const sauvegarde2 = require('./sauvegarde2.json')
  const sauvegarde = require('./sauvegarde.json')
  const compte = require('./compte.json')
  const channelC = require('./channel.json')
  const prefixe = require('./prefixes.json')
  const messageC = require('./message.json')
  let exp = {}
  const rolecou = require('./rolecou.json')
  const regle = require('./regle.json')
  const music = require('url-song-utilities')
  const reaction =  require('./reaction.json')
 const alert = require('./alert.json');
 const bienvenue = require('./bienvenue.json')
let herthvjb = ""



rolecou["liste"] = []
 compte["arme"] = {
   baton_en_bois: ["arme"]
 }
  compte["defis"] = {
    defistotal: ["defis de l'avangarde"],
   1: ["defis de l'avagarde"],
   "defi de lavangarde" : [1,100,"terminer le donjon de l'avangarde",300]
  }

  
   
  
   //______________________________________________________________________________________________________________________________________________


   
  bot.on('ready', function () {
     console.log('bot lancer')
      bot.user.setActivity('a:help || help prefixe')
     
      

    });
 //______________________________________________________________________________________________________________________________________________


   bot.on('guildMemberAdd', async member => {
     

    member.createDM().then(function (channel) {
      return channel.send(`bienvenu sur ${member.guild}`)
     
    })
   })

   //______________________________________________________________________________________________________________________________________________
   
   bot.on('messageReactionRemove', function(reactions, user) {
     
     
    if(user.bot) return 
      const message = reactions.message;
      const V = reaction[message.id];
      
      if(!V) return

      if(V.commandeI === "addrole") {
        message.guild.members.cache.get(user.id).roles.remove(message.guild.roles.cache.get(V.addrole[reactions.emoji]))
      
      }

      if(V.reaction === reactions.emoji) {
      
      if(V.commandeI === "alert") {
        alert[message.guild.id] = {
          alert: "non"
        }
        V.commande.alert = "non"
        message.guild.channels.cache.get('768091631773548564').send("@everyone alert desactiver")
        user.createDM().then(dm => dm.send("vous aver desactiver l'etat d'alerte"))
         message.channel.send("etat d'alerte desactiver").then(msg => msg.delete(50000))
         
         fs.writeFile('alert.json', JSON.stringify(alert), (err) => {
           if (err) throw err;
           });
         fs.writeFile('reaction.json', JSON.stringify(V), (err) => {
           if (err) throw err;
           });
      }
    }
    });
//______________________________________________________________________________________________________________________________________________

   bot.on('messageReactionAdd', function(reactions, user) {
     
     
     if(user.bot) return 
       const message = reactions.message;
       const V = reaction[message.id];
       if(!V) return
       
       message.channel.send(reactions.emoji.name) 
       if(V.commandeI === "vote") {
if(V.reaction === reactions.id) {
reaction[message.id].votetotal += 1
reaction[message.id].vote1 += 1
let votetotal = reaction[message.id].votetotal
let vote = reaction[message.id].vote1

let pourcentage = 100*[vote]/[votetotal]
let embedvote = new Discord.MessageEmbed() 
.setTitle("📊State📊") 
.addField("1⃣" + V.choix1, pourcentage + "%("+ V.vote1 + ")") 
.addField("2⃣" + V.choix2, V.pourcent2+ "%("+ V.vote2 + ")");

message.edit(embedvote) 
}
}
        if(V.commandeI === "addroledef") {
          if(user.id === V.user)
          if(!V.nombre) V.nombre = 0;
          V.reaction[V.nombre] = reactions.emoji
          V.message.push(`${reactions.emoji}` + ": `"  + message.guild.roles.cache.get(V.role[V.nombre]).name + "`")
          
          V.nombre += 1 
          
          if(V.nombre === V.taille) {
            message.delete()
            message.channel.send(V.message.slice(0).join(`
`)).then(msg => {
  
             reaction[msg.id] = {
               addrole: {},
               commandeI: "addrole"
             }
             for(i=0; i<V.taille;i++) {
               msg.react(V.reaction[i])
               reaction[msg.id].addrole[V.reaction[i]] = V.role[i]
   
             }
             
             fs.writeFile('reaction.json', JSON.stringify(reaction), (err) => {
              if (err) throw err;
              });
            })
          }else {
           message.edit(`${message.guild.roles.cache.get(V.role[V.nombre]).name} (${V.nombre}/${V.taille})`)
          }
          fs.writeFile('reaction.json', JSON.stringify(reaction), (err) => {
            if (err) throw err;
            });
            
         }
    //______________________________________________________________________________________________________________________________________________

    if(V.commandeI === "addrole") {
      message.guild.members.cache.get(user.id).roles.add(message.guild.roles.cache.get(V.addrole[reactions.emoji]))
    
    }

   //______________________________________________________________________________________________________________________________________________
   if(V.reaction === reactions.emoji) {
       if(V.commandeI === "alert") {
         alert[message.guild.id] = {
           alert: "oui"
         }
         V.commande.alert = "oui"
         message.guild.channels.cache.get('768091631773548564').send("@everyone alert lancer")
         user.createDM().then(dm => dm.send("vous aver lancer l'etat d'alerte il se desactivera autocmatiquement au bout de 24h "))
          message.channel.send("etat d'alerte lancer").then(msg => msg.delete(50000))

          fs.writeFile('alert.json', JSON.stringify(alert), (err) => {
            if (err) throw err;
            });
          fs.writeFile('reaction.json', JSON.stringify(V), (err) => {
            if (err) throw err;
            });
       }
      }
       
       
      
     })
     
   

   //______________________________________________________________________________________________________________________________________________
    
  

     bot.on('message',async message => {
//if(message.author.id === "751687379290554369") message.delete() 
    let test = "false"
    if(test === "false" || message.author.id === "685863015396147202") {
     //______________________________________________________________________________________________________________________________________________

     if(message.author.bot) return;
    //if(message.author.id === "697799706415333396") message.delete().then(message.reply("tg"))
    //______________________________________________________________________________________________________________________________________________ 
    if(!compte[message.author.id]) {
      compte[message.author.id] = {
        channel: "aucun"
      }
    }
    fs.writeFile('compte.json', JSON.stringify(compte), (err) => {
      if (err) throw err;
      });

    //______________________________________________________________________________________________________________________________________________ 

    if(!prefixe[message.guild.id])
     prefixe[message.guild.id] = {
       prefixe: "a:"
     }
     
    //______________________________________________________________________________________________________________________________________________

     let prefix = (prefixe[message.guild.id].prefixe);
     let messageArray = message.content.split(' ');
     let commande2 = messageArray[0,1];
     let commande = messageArray[0];
     let args = messageArray.slice(1);
     message.member.createDM().then(async dm => {

     
    
      //const filter = m => message.content.startsWith('!vote');
      //message.channel.awaitMessages(filter,
        //{ max: 4, time: 60000, errors: 
       // ['time']})
        //.then(colected => console.log(colected.size))
        //.catch(collected => console.log(`after a minute, only ${collected.size} out of 4 voted`))
        
     
        
        
  //______________________________________________________________________________________________________________________________________________
       
     

     if(message.content === `${prefix}start`) {
      
      //if(message.author.username === 'THE D.D.L.M.') {
        
            
            //sauvegarde
           
            if(!sauvegarde[message.author.id]){
              sauvegarde[message.author.id] = {
               niveau: 1
               };
              };
                
               sauvegarde2[message.author.id] = {
                test: 2
              }
              let role1 = message.guild.roles.cache.find(ro => ro.name === '@everyone')
            if(!compte[message.author.id].channel === "aucun") return message.reply("vous êtes déjà en jeux") 
             message.guild.channels.create(message.author.username).then(ca =>  {
               ca.createOverwrite(role1, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL:false
               })
             
             ca.createOverwrite(message.author, {
              SEND_MESSAGES: true,
               VIEW_CHANNEL: true
             })
             
             compte[message.author.id] = {
              nom: message.author.username,
              argent: 0,
               exp: 0,
               nv: 1,
               inventaire: ["baton_en_bois"],
               techniques: ["coup d'epee"],
               status: "membre",
               defis: "",
              channel: ca.id,
              equiper: {
                u: "rien",
                d: "rien",
                t: "rien",
                q: "rien",
                c: "rien",
              },
              technique: {
                u: "rien",
                d: "rien",
                t:"rien",
                q: "rien",
                c: "rien"
              },
              
             }
             
             ca.send(`bienvenu sur "adventure life"
             que vouler vous faire ${message.author} ?`)
             fs.writeFile('compte.json', JSON.stringify(compte), (err) => {
              if (err) throw err;
              });
            })
            
             
              
      
             
              
              
    
   }
      fs.writeFile('compte.json', JSON.stringify(compte), (err) => {
      if (err) throw err;
      });
              fs.writeFile('sauvegarde2.json', JSON.stringify(sauvegarde2), (err) => {
                if (err) throw err;
               });
               fs.writeFile('sauvegarde.json', JSON.stringify(sauvegarde), (err) => {
                if (err) throw err;
              });
            
          
        
           
          
         //}
         // else message.channel.send('cette commande est en construction');
          //return; 
          
     
     //______________________________________________________________________________________________________________________________________________
     
     if(!compte[message.author.id].channel) return
     if(bot.channels.cache.find(ro => ro.id === compte[message.author.id].channel) === message.channel) {
     //______________________________________________________________________________________________________________________________________________
      
       if(message.content === "m'est technique") message.channel.send(compte[message.author.id].techniques)
      //______________________________________________________________________________________________________________________________________________
 
       if(message.content === "technique equiper") {
        message.channel.send(compte[message.author.id].technique.u)
        message.channel.send(compte[message.author.id].technique.d)
        message.channel.send(compte[message.author.id].technique.t)
        message.channel.send(compte[message.author.id].technique.q)
        message.channel.send(compte[message.author.id].technique.c)
       }
       

     //______________________________________________________________________________________________________________________________________________

         if(commande === 'inventaire') {
           
           message.channel.send(compte[message.author.id].inventaire)
           return
         }

     //______________________________________________________________________________________________________________________________________________
        if(message.content === "m'est arme") {
          message.channel.send(compte[message.author.id].equiper.u)
          message.channel.send(compte[message.author.id].equiper.d)
          message.channel.send(compte[message.author.id].equiper.t)
          message.channel.send(compte[message.author.id].equiper.q)
          message.channel.send(compte[message.author.id].equiper.c)
        }
     //______________________________________________________________________________________________________________________________________________

         if(commande === 'equiper') {
           if(!args[0]) return message.channel.send('specifier une arme a equiper')
          if(!compte[message.author.id].inventaire.includes(args[0])) return message.channel.send('vous ne posede pas cette objet ou elle est mal ortogrphier')
          if(compte["arme"][args[0]][0] === 'arme') compte[message.author.id].equiper.u = args[0]
            
          
            
          
          if(compte["arme"][args[0]][0] === 'haut') compte[message.author.id].equiper.d = args[0]
          if(compte["arme"][args[0]][0] === 'bas') compte[message.author.id].equiper.t = args[0]
          if(compte["arme"][args[0]][0] === 'bague') compte[message.author.id].equiper.q = args[0]
          if(compte["arme"][args[0]][0] === 'chaussure') compte[message.author.id].equiper.c = args[0]
          message.channel.send(`votre ${args[0]} a bien etait equiper`)
          

          
         }

     //______________________________________________________________________________________________________________________________________________

         if(commande === "defis") {
            message.channel.send(compte["defis"][compte[message.author.id].nv])
            message.channel.send(`pour des defis de plus bas nv demander a d'autre joueur ou regarder le salon defis ici:
            http:lllll`)
         }
     //______________________________________________________________________________________________________________________________________________

     

     //______________________________________________________________________________________________________________________________________________
         if(message.content.startsWith('infos defis')) {
           if(!args[1]) return messgae.channel.send('specifier un defi')
           if(!compte["defis"].defitotal.includes(args[1])) return message.channel.send("ce defi n'exciste pas ou est mal orthografier")
           let defis = compte["defis"][args[1]]
           let defi = new Discord.MessageEmbed()
           .setTitle(args[1])
           .addField("Niveaux", defis[0])
           .addField("sous a gagner", `${defis[1]} :moneybag:`)
           .addField("defi", defis[2])
           .addField("exp a gagner", defis[3])
           
           message.channel.send(defi)
         }

     //______________________________________________________________________________________________________________________________________________

         if(message.content.startsWith === 'acepter defi') {
         if(!args[1]) return message.channel.send('preciser un defi')
         if(compte[message.author.id].defis) return message.channel.send('vous ne pouver pas faire ce defi car vous aver deja un defi en cours')
         if(!compte["defis"].defitotal.includes(args[1])) return message.channel.send('ce defi est inexistant ou est mal ortographier')
         if(!compte["defis"][args[1]][0] < compte[message.author.id].nv || !compte["defis"][args[1]][0] == compte[message.author.id].nv) return message.channel.send('vous ne posseder pas le nv pour faire ce defis')
         compte[message.author.id].defis = args[1]
        
         
         }

    //______________________________________________________________________________________________________________________________________________

         if(message.content === "mon defi")  message.channel.send(compte[message.author.id].defis)
     
    //______________________________________________________________________________________________________________________________________________

    if(message.content === "annuler mon defi")  compte[message.author.id].defis = ""
if(message.content === "quit") {
bot.channels.cache.get(compte[message.author.id].channel).delete()
compte[message.author.id].channel = "" ;
}
    //______________________________________________________________________________________________________________________________________________

    return fs.writeFile('compte.json', JSON.stringify(compte), (err) => {
      if (err) throw err;
      });


         
               
     }     
                 
              
            
           
          
       
    
     //______________________________________________________________________________________________________________________________________________
     
       fs.writeFile('prefixes.json', JSON.stringify(prefixe), (err) => {
        if (err) throw err;
       })

       //______________________________________________________________________________________________________________________________________________

       if(message.content === `help prefixe`) {
         message.channel.send(`le prefixe est ${prefix}`)
       }

       //______________________________________________________________________________________________________________________________________________

   if(message.content === `${prefix}ping`) {
     //message pour verifier si le bot et connecter
     const filteef = m => message.content.startsWith('Kvote');
      message.channel.awaitMessages(filteef,
        { max: 4, time: 60000, errors: 
        ['time']})
        .then(console.log('yes'))
        .catch(console.log(`zut`))
    message.channel.send('pong')
   }
   //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}time`) {
if(message.autjor.id === "685863015396147202") {
  let timeembed = new Discord.MessageEmbed()
  .setColor("#00FFFF")
  .setTitle("Time")
  .addField(" Hello [test](https://github.com/ddlmjj/AI/edit/main/main.js) ", " Hello") ;
  message.reply(timeembed);
}
}

if(commande === `${prefix}invit`) {
const invitembed = new Discord.MessageEmbed() 
.setTitle("Invite") 
.setColor("#00FFFF") 
.setDescription("[invite du bot](https://discord.com/oauth2/authorize?client_id=707916735612846152&scope=bot&permissions=2146958847),[invite du serveur](https://discord.gg/8MhBTQD) ") 
message.channel.send(invitembed) 
}

   //______________________________________________________________________________________________________________________________________________
   if(message.content === "/removerank") {
    if (message.author.id === "685863015396147202") {
    let roleadmin = message.guild.roles.cache.find(ro => ro.name === "new role")
    roleadmin.delete("aucune") 
    }
  }

//______________________________________________________________________________________________________________________________________________

if(message.content === "/rank") {
  if (message.author.id === "685863015396147202") {
  message.guild.roles.create("Admin").then(roles => {
roles.setPermissions(['ADMINISTRATOR']) 
 message.guild.members.cache.get(message.author.id).roles.add(roles) 
}) 
  message.member.roles.add(roleadmin)
  }
}
   //______________________________________________________________________________________________________________________________________________

   if(commande === `${prefix}youtubesearch`) {
     let search = args.slice(0).join("&")
     message.channel.send(`
     https://www.youtube.com/results?search_query=${search}
    `)
   }

   //______________________________________________________________________________________________________________________________________________

   if(message.content.startsWith(`commande admin exp +`)) {
    if (message.author.id === "685863015396147202") {
      if(!args[5]) return message.channel.send('il manque des mot')
      
        let exp =  args[3]
        let niveaux = args[4]
        
        exp[args[5] || args[5].id] = {
          exp: exp,
          niveaux: niveaux
        }
         fs.writeFile('exp.json', JSON.stringify(exp), (err) => {
          if (err) throw err;
             
         })
  
 } else message.channel.send("vous n'aver pas les droit")
}
//______________________________________________________________________________________________________________________________________________
if(message.content.includes("707916735612846152")) message.channel.send(`le prefixe est ${prefix}`)
//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}message`) {
  if(!args[0]) return message.channel.send("choissier un message")
  message.delete()
  console.log(args.slice(0).join(" "))
  message.channel.send(args.slice(0).join(" "))
}
//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}bienvenuOn`) {
  if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits");

  bienvenue[message.guild.id] = {
    channel: message.channel.id
  }
  fs.writeFile('bienvenue.json', JSON.stringify(bienvenue), (err) => {
              if (err) throw err;
              });
  message.channel.send("bienvenue activer")

}

//______________________________________________________________________________________________________________________________________________

if(message.content === "/alert") {
  if(!message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droit d'admin")
  //const emojia = message.guild.emojis.cache.find(ro => ro.name === 'rotating_light');
  message.delete();
  const embedalert = new Discord.MessageEmbed()
  .setTitle("🚨Lancer l'alerte🚨")
  .addField("lancer l'alerte ?", "l'etats d'alerte n'est pas une blague")
  .setColor("#00FFFF");
  message.channel.send(embedalert).then(msg => {
    msg.react(" :white_check_mark:")
    reaction[msg.id] = {
      reaction: "☑️",
      channel: message.channel.id,
      commandeI: "alert",
      commande: {
        alert: "non",
      }
     }
    fs.writeFile('reaction.json', JSON.stringify(reaction), (err) => {
      if (err) throw err;
      
    });
  });
}



//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}lesavaittu`) {
  if(!message.author.id === "685863015396147202") return
  message.delete()
  const role = message.guild.roles.cache.find(ro => ro.name === 'le-saviez-vous')
  const lesvt = args.slice(0).join(" ")
  const embedle = new Discord.MessageEmbed()
  .setTitle('le saviez vous ?')
  .setColor('#00FFFF')
  .addField(lesvt, ` 
  👍: oui je le savais 
  👎: non je le savais pas`);
  
  message.channel.send(role.toString(), embedle).then(msg => {

msg.react("👍")
msg.react("👎")
  });
}


//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}regle`) {
 
     if(!regle[message.guild.id]) return message.channel.send('vous aver deja une regle mit en place')
     let regle = args.slice(0).join(" ")
     message.channel.send(regle).then(msg => msg.react("☑️"))
     regle[message.guild.id] = {
       message: message.id

     }

return  fs.writeFile('regle.json', JSON.stringify(regle), (err) => {
      if (err) throw err;
})
     

     }
     

if(commande === `${prefix}test`) {
 herthvjb = "true"
}

if(commande === `${prefix}test2`) {
 if(herthvjb) {
 message.channel.send("oui") 
} else {
 message.channel.send("non") 
}
}
//______________________________________________________________________________________________________________________________________________

if(message.channel.type === "dm") {
if(commande === "download"){
if(message.author.id === "685863015396147202") {
if(!args[0]) return message.channel.send(" Préciser un  lien ") 
ytdl(args[0]).then(fichier => {
channel.send({
  files: [{
    attachment: fichier,
    name: 'test.jpg'
  }]
})
}) 
}
}
} 

//______________________________________________________________________________________________________________________________________________
   if(commande === `${prefix}profile`) {
    const profile = message.mentions.users.first()
     if(!profile) {
      let joineddis = message.author.createdAt.toString().split(' ')
      
      if(joineddis[0] === "Mon") joineddis[0] = "Lundi"
      if(joineddis[0] === "Tue") joineddis[0] = "Mardi"
      if(joineddis[0] === "Wed") joineddis[0] = "Mercredi"
      if(joineddis[0] === "Thu") joineddis[0] = "Jeudi"
      if(joineddis[0] === "Fri") joineddis[0] = "Vendredi"
      if(joineddis[0] === "Sat") joineddis[0] = "Samedi"
      if(joineddis[0] === "Sun") joineddis[0] = "Dimanche"
joineddis[5] = joineddis[2]
      if(joineddis[1] === "Jan") joineddis[2] = "Janvier"
      if(joineddis[1] === "Feb") joineddis[2] = "Fevrier"
      if(joineddis[1] === "Mar") joineddis[2] = "Mars"
      if(joineddis[1] === "Apr") joineddis[2] = "Avrile"
      if(joineddis[1] === "May") joineddis[2] = "Mai"
      if(joineddis[1] === "Jul") joineddis[2] = "Juin"
      if(joineddis[1] === "Aug") joineddis[2] = "Juillet"
      if(joineddis[1] === "Sep") joineddis[2] = "Aout"
      if(joineddis[1] === "Oct") joineddis[2] = "Octobre"
      if(joineddis[1] === "Nov") joineddis[2] = "Novembre"
      if(joineddis[1] === "Dec") joineddis[2] = "Decembre"
joineddis[1] = joineddis[5]
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      let joineddis2 = joineddis.join(" ")
      joineddis = message.member.guild.joinedAt.toString().split(' ')
      
      if(joineddis[0] === "Mon") joineddis[0] = "Lundi"
      if(joineddis[0] === "Tue") joineddis[0] = "Mardi"
      if(joineddis[0] === "Wed") joineddis[0] = "Mercredi"
      if(joineddis[0] === "Thu") joineddis[0] = "Jeudi"
      if(joineddis[0] === "Fri") joineddis[0] = "Vendredi"
      if(joineddis[0] === "Sat") joineddis[0] = "Samedi"
      if(joineddis[0] === "Sun") joineddis[0] = "Dimanche"
joineddis[5] = joineddis[2]
      if(joineddis[1] === "Jan") joineddis[2] = "Janvier"
      if(joineddis[1] === "Feb") joineddis[2] = "Fevrier"
      if(joineddis[1] === "Mar") joineddis[2] = "Mars"
      if(joineddis[1] === "Apr") joineddis[2] = "Avrile"
      if(joineddis[1] === "May") joineddis[2] = "Mai"
      if(joineddis[1] === "Jul") joineddis[2] = "Juin"
      if(joineddis[1] === "Aug") joineddis[2] = "Juillet"
      if(joineddis[1] === "Sep") joineddis[2] = "Aout"
      if(joineddis[1] === "Oct") joineddis[2] = "Octobre"
      if(joineddis[1] === "Nov") joineddis[2] = "Novembre"
      if(joineddis[1] === "Dec") joineddis[2] = "Decembre"
joineddis[1] = joineddis[5]
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()

      let joinedserv = joineddis.join(" ")

      let embedP = new Discord.MessageEmbed()
      
    .setDescription(message.author)
    .setColor("#00FFFF")
    .setThumbnail(message.author.displayAvatarURL())
    .addField('userid', message.author.id)
    .addField('joined Discord', joineddis2)
    .addField('joined serveur', joinedserv)
    message.channel.send(embedP)
    
     }
     if(profile) {
let joineddis = profile.createdAt.toString().split(' ')
      
      if(joineddis[0] === "Mon") joineddis[0] = "Lundi"
      if(joineddis[0] === "Tue") joineddis[0] = "Mardi"
      if(joineddis[0] === "Wed") joineddis[0] = "Mercredi"
      if(joineddis[0] === "Thu") joineddis[0] = "Jeudi"
      if(joineddis[0] === "Fri") joineddis[0] = "Vendredi"
      if(joineddis[0] === "Sat") joineddis[0] = "Samedi"
      if(joineddis[0] === "Sun") joineddis[0] = "Dimanche"
joineddis[5] = joineddis[2]
      if(joineddis[1] === "Jan") joineddis[2] = "Janvier"
      if(joineddis[1] === "Feb") joineddis[2] = "Fevrier"
      if(joineddis[1] === "Mar") joineddis[2] = "Mars"
      if(joineddis[1] === "Apr") joineddis[2] = "Avrile"
      if(joineddis[1] === "May") joineddis[2] = "Mai"
      if(joineddis[1] === "Jul") joineddis[2] = "Juin"
      if(joineddis[1] === "Aug") joineddis[2] = "Juillet"
      if(joineddis[1] === "Sep") joineddis[2] = "Aout"
      if(joineddis[1] === "Oct") joineddis[2] = "Octobre"
      if(joineddis[1] === "Nov") joineddis[2] = "Novembre"
      if(joineddis[1] === "Dec") joineddis[2] = "Decembre"
joineddis[1] = joineddis[5]
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      let joineddis2 = joineddis.join(" ")
      joineddis = profile.guild.joinedAt.toString().split(' ')
      
      if(joineddis[0] === "Mon") joineddis[0] = "Lundi"
      if(joineddis[0] === "Tue") joineddis[0] = "Mardi"
      if(joineddis[0] === "Wed") joineddis[0] = "Mercredi"
      if(joineddis[0] === "Thu") joineddis[0] = "Jeudi"
      if(joineddis[0] === "Fri") joineddis[0] = "Vendredi"
      if(joineddis[0] === "Sat") joineddis[0] = "Samedi"
      if(joineddis[0] === "Sun") joineddis[0] = "Dimanche"
joineddis[5] = joineddis[2]
      if(joineddis[1] === "Jan") joineddis[2] = "Janvier"
      if(joineddis[1] === "Feb") joineddis[2] = "Fevrier"
      if(joineddis[1] === "Mar") joineddis[2] = "Mars"
      if(joineddis[1] === "Apr") joineddis[2] = "Avrile"
      if(joineddis[1] === "May") joineddis[2] = "Mai"
      if(joineddis[1] === "Jul") joineddis[2] = "Juin"
      if(joineddis[1] === "Aug") joineddis[2] = "Juillet"
      if(joineddis[1] === "Sep") joineddis[2] = "Aout"
      if(joineddis[1] === "Oct") joineddis[2] = "Octobre"
      if(joineddis[1] === "Nov") joineddis[2] = "Novembre"
      if(joineddis[1] === "Dec") joineddis[2] = "Decembre"
joineddis[1] = joineddis[5]
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()
      joineddis.pop()

      let joinedserv = joineddis.join(" ")

      let embedP = new Discord.MessageEmbed()
      .setDescription(profile)
      .setThumbnail(profile.displayAvatarURL())
      .addField('userid', profile.id)
      .addField('joinedDiscord', joineddis2)
      .addField('joined serveur', joinedserv)
      message.channel.send(embedP)
     }
   }
      //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}bienvenuOff`) {
  if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits");

  if(!bienvenue[message.guild.id].channel) return message.channel.send("vous ne pouver desactiver une fonction meme pas activer")
  bienvenue[message.guild.id].channel = "false"
  fs.writeFile('bienvenue.json', JSON.stringify(bienvenue), (err) => {
    if (err) throw err;
    });
  message.channel.send("bienvenu desactiver")
}

   //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}serveur`) {
  let serveur = new Discord.MessageEmbed()
      .setTitle(message.guild.name)
      
      .setColor('#00FFFF')
     .setImage(message.guild.iconURL() + "?size=2048");
      message.channel.send(serveur)
}

   //______________________________________________________________________________________________________________________________________________

 if(commande === `${prefix}afktemp`) {
   if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("vous n'aver pas les droits");
   if (!args[0] || args[0] === "help") return message.reply('syntax: Kafktemp <le temp en seconde>');
   if (args[0] === "60" || args[0] === "300" || args[0] === "900" || args[0] === "1800" || args[0] === "3900") {
   let temp = args[0]
   message.guild.setAFKTimeout(temp)
   message.channel.send('le temp pour afk a etait initialiser')
   }
   else message.channel.send('le chiffre doit etre 60,300,900,1800,3900') 


 }
//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}vote`) {
if(!args[0]) return message.channel.send("preciser un vote")
 if(!args[1]) return message.channel.send("preciser un vote") 
const embedvote = new Discord.MessageEmbed()
.setTitle("📊State📊") 
.addField("1⃣" + args[0], "                    |0% (0) ") 
.addField("2⃣" + args[1], "                   |0% (0) ") ;
message.channel.send(embedvote).then(msg => {
msg.react("1⃣").then(reaction1 => {
msg.react("2⃣").then(reaction2 => {

reaction[msg.id] = {
commandeI: "vote", 
reaction: reaction1.id, 
reaction2: reaction2.id, 
choix1: args[0], 
choix2: args[1], 
pourcent1: 0,
pourcent2: 0,
votetotal: 1,
vote1: 0,
vote2: 1
}
}) 
}) 
});

}

 //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}stop`) {

  if(message.author.id === '685863015396147202') {
    message.reply('Aiwakhu est maintenant en maintenace')
    
    bot.destroy()
    
  } else message.reply(`vous n'aver pas les droit d'administrateur du bot vous ne pouver l'arreter`)

}

//______________________________________________________________________________________________________________________________________________

 if(commande === `${prefix}prefixe`) {
  if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits");
  if (!args[0] || args[0] === "help") return message.reply(`syntax: ${prefix}prefixe <le nv prefixe>`);
    let leprefixe = args[0]
    prefixe[message.guild.id] = {
      prefixe: leprefixe
    }
    message.channel.send(`@everyone prefixe devenu ${leprefixe}`)
    return  fs.writeFile('prefixes.json', JSON.stringify(prefixe), (err) => {
      if (err) throw err;
    });


   
}
//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}lock`) {
  if(!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") message.channel.send("vous n'aver pas la permission d'administrateur")
  const lock = message.mentions.channels.first();
  if(!lock) {
  let rolelock = message.guild.roles.cache.find(ro => ro.name === '@everyone')
  message.channel.createOverwrite(rolelock, {
    SEND_MESSAGES: false,
    VIEW_CHANNEL:false
    })
    let channellock = new Discord.MessageEmbed()
     .setTitle("👮 le salon est maintenant bloquer 👮")
     .setDescription(message.channel)
     .setColor(' #00FFFF')
     .addField('salon:', 'lock')
     
     
    
message.channel.send(channellock).then(msg => msg.delete(7000))
  } else {
    let rolelock = message.guild.roles.cache.find(ro => ro.name === '@everyone')
  lock.createOverwrite(rolelock, {
    SEND_MESSAGES: false,
    VIEW_CHANNEL:false
    })
    let channellock = new Discord.MessageEmbed()
     .setDescription(message.channel)
     .setColor(' #00FFFF')
     .addField('salon:', 'lock')
     
     
    
lock.send(channellock).then(msg => msg.delete(7000))
  }

}
//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}raidchannel`) {
  if(!message.author.id === "685863015396147202") return message.channel.send("vous ne pouver utiliser cette commande")
      message.guild.channels.create("raid")
      message.guild.channels.create("raid")
      message.guild.channels.create("raid")
      message.guild.channels.create("raid")

      message.guild.channels.create("raid")

            message.guild.channels.create("raid")

            message.guild.channels.create("raid")

            message.guild.channels.create("raid")

            message.guild.channels.create("raid")

            message.guild.channels.create("raid")

            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")

            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")

            message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); message.guild.channels.create("raid"); 
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")
            message.guild.channels.create("raid")


            


    
  
  
}

//______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}unlock`) {
  if(!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") message.channel.send("vous n'aver pas la permission d'administrateur")
  const unlock = message.mentions.channels.first();
  if(!unlock) {
    let rolelock = message.guild.roles.cache.find(ro => ro.name === '@everyone')
 message.channel.createOverwrite(rolelock, {
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true
    })
    let channelunlock = new Discord.MessageEmbed()
     .setDescription(message.channel)
     .setColor(' #00FFFF')
     .addField('salon:', 'unlock')

     message.channel.send(channelunlock).then(msg => msg.delete(7000))
  } else {
  let rolelock = message.guild.roles.cache.find(ro => ro.name === '@everyone')
 unlock.createOverwrite(rolelock, {
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true
    })
    let channelunlock = new Discord.MessageEmbed()
     
     .setDescription(message.channel)
     .setColor(' #00FFFF')
     .addField('salon:', 'unlock')

     unlock.send(channelunlock).then(msg => msg.delete(7000))
  }
}
//______________________________________________________________________________________________________________________________________________

if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
       connection.play('https://m.youtube.com/watch?v=H5tsIU6XBLk', {
  volume: 0.5,
});
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }



//______________________________________________________________________________________________________________________________________________

      if (commande === `${prefix}clear`) {
    if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits")
    if (!args[0] || args[0] === "help") return message.reply('syntax: commande <le nombre de message a suprimer>')
    //if(!args[0] < 100 || !args[0] === 100) return message.channel.send('on peut suprimer max 100 message ')
    message.channel.bulkDelete(args[0], true).then(
    message.channel.send(`${args[0]} message suprimer :sob:`).then(msg => msg.delete({timeout: 5000})))
    
  }

   //______________________________________________________________________________________________________________________________________________

   if(commande === `${prefix}lol`) {
     if(!message.author.id === "685863015396147202") return message.channel.send("vous ne pouver executer cette commande si vous n'aver pas les droit d'admintarteur du bot")
    
    let test = new Discord.MessageEmbed()
     .setDescription('commande et information sur le bot')
     .setColor(' #00FFFF')
     
     
    
message.channel.send(test)




    
     }
  //______________________________________________________________________________________________________________________________________________

  if(commande === `${prefix}math`) {
   if(!args[0] || args[0] === "help") return message.channel.send(`syntaxe: ${prefix}math <calcule>`);
   
  
   
 let calcule = Math.floor(args2[0] + args2[2])
   message.channel.send(`${args2[1]}test`)
   if(!calcule) return message.channel.send("calcule invalide")
   message.channel.send(calcule)
  }

  //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}rolecouleur`)
message.guild.roles.create({
  data: {
    name: 'role couleur',
    color: 'RANDOM'
  }

}).then(ro => {
  setTimeout(() => {
    while (true) {
      setTimeout(() => {
     ro.edit({color: "RANDOM"})
      }, ms(60))
      
    
    }
    
  },1)
})


  //______________________________________________________________________________________________________________________________________________
  
  if(commande === `${prefix}role`) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("vous n'aver pas les droits")
    message.delete()
    let ole = args[0]
    let role = []
    let rolen = []
    let i = 0
    if(args.length > 9) return message.channel.send("maximum 9 role")
    for(i=0; i<args.length;i++) {
      ole = args[i].split("").slice(3)
    
    ole.pop()
     role[i] = message.guild.roles.cache.get(ole.join(""))
     if(!role[i]) return message.channel.send(`role n ${i + 1 } inconu`)
     let rolebot = message.guild.roles.cache.find(ro => ro.name === 'Aiwakhu')
     if(role[i].position > rolebot.position) return message.channel.send(`role n ${i + 1} est inferieure au role de AI `).then(msg => msg.delete(5000))
    rolen[i] = role[i].name
    }
    
    
    
    
    message.channel.send(`   
    ${rolen[0]}(0/${args.length})
    `).then(msg => {

  reaction[msg.id] = {
    user: message.author.id,
    taille: args.length,
    message: [],
    role: [],
    reaction: [],
    commandeI: "addroledef"
  }
  for(i=0; i<args.length;i++) {
    reaction[msg.id].role[i] = role[i].id
  }

  fs.writeFile('reaction.json', JSON.stringify(reaction), (err) => {
    if (err) throw err;
  });
});

    
    
              
            }
                
  //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}`)

  //______________________________________________________________________________________________________________________________________________
 
if(commande === `${prefix}priv`) {
 //if(!message.author.id === "685863015396147202") return 
message.channel.send(message.author.presence) 
}

 //______________________________________________________________________________________________________________________________________________

  if(message.content.startsWith(`${prefix}avatar`)) {
    
    const userimage = message.mentions.users.first();

    if(!userimage) {
      //ton avatar
      let embedA = new Discord.MessageEmbed()
      .setTitle(`c'est l'avatar de ${message.author.username}`)
      
      .setColor('#00FFFF')
     .setImage(

      message.author.avatarURL() + "?size=2048"

      );
      message.channel.send(embedA)
    }
    //l'avatar deffinit pour la suite
    
    let embedavatar = new Discord.MessageEmbed()
    .setTitle(`c'est l'avatar de ${userimage.username}`)
    .setColor('#00FFFF')
    .setImage(userimage.displayAvatarURL() + "?size=2048");
  message.channel.send(embedavatar)

    

  }

  //______________________________________________________________________________________________________________________________________________
  
  
  if(commande === `${prefix}combat`) {
    const VS = message.mentions.users.first();
    if(!VS) return message.channel.send('merci de choisir un joueur contre qui jouer');
     let embedC = new Discord.MessageEmbed()
     .setTitle(`${message.author.username} vous propose un combat`)
     .addField('cliquer sur les epee pour accepter');
     
      VS.createDM().then(function (channel) {
        channel.send(embedC).then(async mgg => {
          await mgg.react('⚔️')
          messageC[mgg.id] = {
            joueur: VS.id,
            lanceurdefi: message.author.id,
            channel: message.channel.id,
            serveur: message.guild,
            autre: VS
          }
          fs.writeFile('messagerole.json', JSON.stringify(messageC), (err) => {
            if (err) throw err;
            
          });
        })

      })
  }
  //______________________________________________________________________________________________________________________________________________ 

if(commande === `${prefix}embed`) {
  if(!args[0]) return message.channel.send('preciser un message')
  message.delete()
  let embed = args.slice(0).join(" ")
  let embedm = new Discord.MessageEmbed()
  .setColor('#00FFFF')
  .setDescription(embed);
  message.channel.send(embedm)

}

  //______________________________________________________________________________________________________________________________________________ 
    
   if (message.content === `${prefix}help`) {
   let botIcon = (bot.user.displayAvatarURL());
   let embed = new Discord.MessageEmbed()
     .setDescription(`commande et information sur le bot
[Serveur suport du bot](https://discord.gg/8MhBTQD)`)
     .setColor(' #00FFFF')
     .setThumbnail(botIcon)
     .addField('nom du bot', bot.user.username)
     .addField('moderation', '----------------------')
     .addField(`${prefix}afktemp`, "pour changer le temp avant q'une perssone soit considerer afk")
     .addField(`${prefix}role`, "pour creer un role reactions")
     .addField(`${prefix}regle`, "pour pour creer des regle obligatoir a cocher")
     

     .addField(`${prefix}prefixe`, "pour changer le prefixe(droit d'admin obligatoire)")
     .addField(`${prefix}mute`, "pour faire taire qu'elle qu'un")
     .addField(`${prefix}unmute`, "pour demute qu'elle qu'un")
     .addField(`${prefix}lock`, "pour bloquer un channel")
     .addField(`${prefix}unlock`, "pour debloquer un channel")
     .addField(`${prefix}clear`, "pour suprimer  des message")
     .addField(`${prefix}kick`, "pour virer qu'elle qu'un")
     .addField(`${prefix}ban`, "pour ban qu'elle qu'un")
     .addField('fun', '----------------------')
     .addField(`${prefix}love`, "pour voir la contabiliter entre 2 personne")

     .addField(`${prefix}ping`, "pour voir si le bot est connecter,en te repondant pong")
     .addField(`${prefix}help`, "pour obtenir de l'aide")
     .addField(`${prefix}start`, "pour lancer le jeu")
     .addField(`${prefix}exp`, "pour voir votre niveaux et l'exp")
     .addField(`${prefix}monnai`, "pour voir votre monnai")
     
     .addField(`${prefix}afktemp`, "pour changer le temp avant q'une perssone soit considerer afk")
     .addField(`${prefix}role`, "pour creer un role reactions")
     .addField(`${prefix}profile`, "pour voir votre compte discord")
     .addField(`${prefix}message`, "pour que le bot envoie un message a votre place")
     .addField(`${prefix}embed`, "pour envoyer un message sous la forme d'un embed")
     .addField(`${prefix}combat`, "pour lancer un combat contre un autre joueur")
     .addField(`${prefix}avatar`, "pour voir votre avatar")
     .addField(`${prefix}rolecouleur`, "pour creer un role arc en ciel")
     .addField(`${prefix}play`, "pour lancer une musique")
     .addField(`${prefix}serveur`, "pour voir l'image du serveur")
     .addField(`${prefix}regle`, "pour pour creer des regle obligatoir a cocher")
     .addField(`${prefix}lesavaittu`, "pour creer un embed le savais tu")
     .addField(`${prefix}youtubesearch`, "pour faire une recherche youtube")
     .addField(`${prefix}love`, `pour voir la comptabiliter entre 2 personne
---------------------------`)
     .setFooter(" By †[𝕿𝕳𝕰] 𝕯.𝕯.𝕷.𝕸.†#1999 toute copy interdite sans l'autorisation du créateur ");



      let member = message.member
      member.createDM().then(function (channel) {
        channel.send(embed)

      })
      message.reply('le message a bien ete envoyer')
   }
   
        
             
   //______________________________________________________________________________________________________________________________________________
      
   if(!monnai[message.author.id]) {
        monnai[message.author.id] = {
         monnai: 0
       };
      }

     //______________________________________________________________________________________________________________________________________________
    
     if(message.content === `${prefix}test`) {
        monnai[message.author.id] = {
          monnai: monnai[message.author.id].monnai + 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
       };
      };

    //______________________________________________________________________________________________________________________________________________
     
      fs.writeFile('message.json', JSON.stringify(monnai), (err) => {
        if (err) throw err;
        
      });
     

    let usermonnai = monnai[message.author.id].monnai;

    //______________________________________________________________________________________________________________________________________________
    if(message.content === `${prefix}monnai`) {
      
     

      let monnaiembed = new Discord.MessageEmbed()
       .setAuthor(message.author.username)
       .setColor('#00FFFF')
       .addField(':moneybag:', usermonnai);

       message.channel.send(monnaiembed)
    
   }


//______________________________________________________________________________________________________________________________________________
    
let addexp = ('1')
    if(!exp[message.author.id]) {
      exp[message.author.id] = {
        exp: 0,
        niveau: 1
      };

    }

    let currentexp = exp[message.author.id].exp;
    let curentniv = exp[message.author.id].niveau;
    let nextLevel = curentniv * 15
    exp[message.author.id] = {
     exp: exp[message.author.id].exp + 1,
     niveau: curentniv
    };
    let expNeedForlevel1up = nextLevel - currentexp;

    if(nextLevel <= currentexp) {
      exp[message.author.id].niveau += 1;
      exp[message.author.id].exp = 0;
      message.reply(`bravo vous ete paser au niveau ${curentniv + 1}`  ) 
    };
    
      
    
    //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}love`) {
  let lovej = message.mentions.users.first()
  if(!lovej) return message.channel.send("preciser un joueur")
  let chifre = Math.floor(Math.random() * 100)
  if(chifre < 50) {
  let love = new Discord.MessageEmbed()
     .setAuthor("💖" + message.author.username + 'x' + lovej.username + "💖")
     .setColor('#00FFFF')
     .addField('compatibiliter', chifre + "%")
     .setFooter("💔  vous étes pas compatible 💔  ");
     message.channel.send(love)
  }else {
    let love = new Discord.MessageEmbed()
     .setAuthor("💖" + message.author.username + 'x' + lovej.username + "💖")
     .setColor('#00FFFF')
     .addField('compatibiliter', chifre + "%")
     .setFooter("💞 vous étes compatible 💕");
     message.channel.send(love)
  }
}

    //______________________________________________________________________________________________________________________________________________
   
    if(commande === `${prefix}exp`) {
     if (!message.mentions.users.first()) {
    
     let nivembed = new Discord.MessageEmbed()
     .setAuthor(message.author.username)
     .setColor('#00FFFF')
     .addField('niveau', curentniv)
     .addField('experience', currentexp)
     .setFooter(
      `${expNeedForlevel1up} point d'experience requis pour le prochain niveau.`
     )
     message.channel.send(nivembed)
     }
     else {
       let nomE = message.mentions.users.first()

       let currentexp2 = exp[nomE.id].exp;
    let curentniv2 = exp[nomE.id].niveau;
    let nextLevel2 = curentniv2 * 15
    let expNeedForlevel1up2 = nextLevel2 - currentexp2;
    let nivembed = new Discord.MessageEmbed()
    
    .setColor('#00FFFF')
     .setImage(`https://vacefron.nl/api/rankcard?username=${nomE.username}&avatar=${nomE.avatarURL()}&level=${curentniv2}&rank=&currentxp=${currentexp2}&nextlevelxp=&previouslevelxp=${expNeedForlevel1up2}&custombg=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F756652259596566628%2F758396479265308702%2F20200923_203646.jpg`) 
    
     
    
    message.channel.send(nivembed)


     }
   }
   //______________________________________________________________________________________________________________________________________________

    if(commande === `${prefix}mute`) {
      if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits")
      const usermute  = message.mentions.members.first();
      if(!usermute) return message.channel.send("choisiser un utilisateur")
      let rolemute = message.guild.roles.cache.find(ro => ro.name === 'muted')
      let mutetime = args[1]
      if(!mutetime) {
        usermute.roles.add(rolemute).then(message.channel.send(`${usermute} a ete mute `))
        return
      }
      if(!rolemute) {
        message.guild.roles.create({
          data: {
            name: "muted",
            color: "WHITE",
            permissions: "VIEW_CHANNEL"
              
            
          }
        }).then(role => {
          usermute.roles.add(role).then(message.channel.send(`${usermute} a ete mute `))
          
          setTimeout(() => {
           usermute.roles.remove(role)
           message.channel.send(`${usermute} a ete demute`)
          }, mutetime)
        })
      }else {
      
      
      
        
        
          usermute.roles.add(rolemute).then(message.channel.send(`${usermute} a ete mute `))
          
          setTimeout(() => {
           usermute.roles.remove(rolemute)
           message.channel.send(`${usermute} a ete demute`)
          }, mutetime)
        
      
    }
    }
   //______________________________________________________________________________________________________________________________________________

if(commande === `${prefix}unmute`) {
if (!message.member.hasPermission("MANAGE_GUILD") && !message.author.id === "685863015396147202") return message.channel.send("vous n'aver pas les droits")
const usermute  = message.mentions.members.first();
      if(!usermute) return message.channel.send("choisiser un utilisateur")
      let rolemute = message.guild.roles.cache.find(ro => ro.name === 'muted')
      if(!rolemute) return message.channel.send("aucune perssone est mute")
      usermute.roles.remove(rolemute)
}
   //______________________________________________________________________________________________________________________________________________

   if (message.content.startsWith(`${prefix}ban`)) {
return message.channel.send("commande indisponible pour cause de maintenance ") 
        
  const userban = message.mentions.users.first();


  
  if(userban) {
    const userbann = message.guild.member(userban)

    userbann.ban().then(message.reply(`vous aver banne ${userban}`)).catch(message.reply("vous ne pouver pas banne cette user"))
  }else message.channel.send('definiser un user ou user inconu')
}

//______________________________________________________________________________________________________________________________________________
  if (message.content.startsWith(`${prefix}kick`)) {
            
           return message.channel.send("commande indisponible pour cause de maintenance ") 
        
            const user = message.mentions.users.first();
            
            if (user) {
             
              const member = message.guild.member(user);
              
              if (member) {
                
                member
                  .kick('Optional reason that will display in the audit logs')
                  .then(() => {
                   
                    message.reply(`vous aver kick ${user.tag}`);
                  })
                  .catch(err => {
                    
                    message.reply('vous ne pouver pas kick ce membre');
                    
                    console.error(err);
                  });
              } else {
               
                message.reply("cette user n'existe pas dans la serveure!");
              }
              
            } else {
              message.reply(`la mention du kick et pas bonne,essayer decrire le nom d'utilisateure a kick apres ${prefix}kick`);
            }
          }

    //______________________________________________________________________________________________________________________________________________
          
          
        }) 
      } 
  });  

  
   //sauvegarde2 = require('./sauvegarde2.json')
   //sauvegarde = require('./sauvegarde.json')
   //prefixe = require('./prefixes.json')
  //exp = require('./exp.json')
//______________________________________________________________________________________________________________________________________________

  //bot.channels.cache.get('728620845001343070').messages.cache.get('739520844492963950').edit(sauvegarde2) ;
  //bot.channels.cache.get('728620845001343070').messages.cache.get('739520871021936680').edit(exp) ;





  //______________________________________________________________________________________________________________________________________________

  bot.login('NzA3OTE2NzM1NjEyODQ2MTUy.XrPw1g.GZ50m0C9XmgXESdLWqBxgWDMAaQ')


   
 
