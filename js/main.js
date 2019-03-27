


(function ($) {

    
    "use strict";
    
    let message = $('.validate-input textarea[name="message"]');
    let results = $(".results")

    $('.contact1-form-btn').on('click',function(){
        let zin = message.val();

        let tokens = ['']

        for(const c of zin)
        {
            if(c == ' ')
            {
                tokens.push('')
                continue;
            }
            if(c.match(/[.,;:"'?!]/i))
            {
                tokens.push(c)
                continue
            }
            tokens[tokens.length-1] += c
        }

        for(let i = tokens.length; i >= 0 ; --i)
        {
            if(tokens[i] == '')
            {
                tokens.splice(i, 1);
            }
        }
        
        let innerhtml = '';
        for(let i = 0; i < tokens.length; ++i)
        {
            let space = tokens[i].match(/[^'"?!]/i) && tokens[i+1] && !tokens[i+1].match(/[.,;:"']/i)
            let element = "<span id=woord_" + i + ">" + tokens[i]  + "</span>" + (space? ' ': '');
            innerhtml += element; 
        }

        results.html(innerhtml);

        ontleed(tokens)
    });

    function ontleed(tokens)
    {   
        function detect_leesteken(token)
        {
            return token.match(/[.,;:?!]/i)
        }

        function detect_lidwoord(token)
        {
            return (token === 'het' || token === "de" || token === "een")
        }

        function detect_bijvoegelijk_naamwoord(token)
        {
            for(const bv of bijv_naamwoorden)
            {
                if (token === bv || token === bv+'e' || token === bv+bv[bv.length-1]+"e") return true;

                if (bv[bv.length-2] === bv[bv.length-3] && bv[bv.length-2].match(/[aeiou]/i))
                {
                    if ( (bv.substring(0, bv.length - 2) + bv.substring(bv.length -1 , bv.length)+'e') === token) return true
                }
            }
            return false;
        }
        
        function detect_persoonlijk_voornaamwoord(token)
        {
            for(const pn of pers_naamwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_bezittelijk_voornaamwoord(token)
        {
            for(const pn of bezit_naamwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_voorzetsels(token)
        {
            for(const pn of voorzetsels)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_koppelwerkwoorden(token)
        {
            for(const pn of koppelwerkwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_bijwoorden(token)
        {
            for(const pn of bijwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_vraagwoorden(token)
        {
            for(const pn of vraagwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_aanwijzend_betrekkelijk_voornaamwoorden(token)
        {
            for(const pn of aanwijzend_betrekkelijk_voornaamwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect_hulpwerkwoorden(token)
        {
            for(const pn of hulpwerkwoorden)
            {
                if(token == pn) return true;
            }
            return false;
        }

        function detect(token)
        {
            let detections = [
                detect_leesteken(token) ? 'leesteken' : false,
                detect_lidwoord(token)  ? 'lidwoord' : false,
                detect_bijvoegelijk_naamwoord(token) ? 'bijvoegelijk_naamwoord_bijwoord' : false,
                detect_persoonlijk_voornaamwoord(token) ? 'persoonlijk_voornaamwoord' : false,
                detect_bezittelijk_voornaamwoord(token) ? 'bezittelijk_voornaamwoord' : false,
                detect_hulpwerkwoorden(token) ? 'hulpwerkwoord' : false,
                detect_voorzetsels(token) ? 'voorzetsel' : false,
                detect_koppelwerkwoorden(token) ? 'koppelwerkwoord' : false,
                detect_bijwoorden(token) ? 'bijwoord' : false,
                detect_vraagwoorden(token) ? 'vraagwoord' : false,
                detect_aanwijzend_betrekkelijk_voornaamwoorden(token) ? 'aanwijzend_betrekkelijk_voornaamwoord' : false
                
            ].filter(result => result != false)
            
            console.log(detections);

            if(detections.length >= 2)
            {
                return "ambigu";
            }
            if(detections.length === 0) return 'zelfstandig_naamwoord';
            return detections[0];
        }

        for(let i = 0; i < tokens.length; ++i)
        {
            $('#woord_' + i).addClass(detect(tokens[i].toLowerCase()));
        }
    }
    

})(jQuery);