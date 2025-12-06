/* Reset y body */
*{margin:0;padding:0;box-sizing:border-box;}
html, body{width:100%;height:100%;font-family:'Arial',sans-serif; background:#e9ebee; display:flex; justify-content:center; padding-top:20px; overflow-x:hidden;}
body.darkTheme{background:#18191A; color:#fff;}

/* Fondo de partículas */
.particles{position:fixed; top:0; left:0; width:100%; height:100%; z-index:-1; pointer-events:none;}

/* Container */
.container{width:90%; max-width:800px; display:flex; flex-direction:column; gap:20px;}

/* Header */
header{text-align:center; margin-bottom:10px;}
header h1{color:#1877F2; font-size:2rem; text-shadow:0 0 5px rgba(24,119,242,0.5);}
header p{color:#1877F2; opacity:0.8;}

/* Online Count */
#onlineCount{color:#1877F2; font-weight:bold; text-align:center; margin-bottom:10px;}

/* Nickname Bubble */
#nicknameBubble{position:fixed; bottom:90px; left:20px; background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); color:#1877F2; padding:10px 15px; border-radius:25px; cursor:pointer; font-weight:bold; box-shadow:0 0 10px rgba(24,119,242,0.5); z-index:10;}
#nicknameModal{position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:20; display:none;}
#nicknameModalContent{background: rgba(255,255,255,0.1); backdrop-filter: blur(15px); border-radius:15px; padding:20px; display:flex; flex-direction:column; gap:10px;}
#nicknameModalContent input, #nicknameModalContent button{padding:10px; border-radius:6px; border:none; font-size:1rem;}
#nicknameModalContent button{background: linear-gradient(90deg,#1877F2,#42A5F5); color:white; font-weight:bold; cursor:pointer; transition:0.2s;}
#nicknameModalContent button:hover{box-shadow:0 0 15px #42A5F5;}

/* Form */
#toryForm{background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius:20px; padding:15px; display:flex; flex-direction:column;}
#toryForm input[type=text]{padding:10px; border-radius:6px; border:none; margin-bottom:10px; font-size:1rem;}
#toryForm button{padding:10px; border:none; border-radius:6px; background: linear-gradient(90deg,#1877F2,#42A5F5); color:white; font-weight:bold; cursor:pointer; transition: transform 0.2s, box-shadow 0.2s;}
#toryForm button:hover{transform:scale(1.05); box-shadow:0 0 20px #42A5F5;}

/* Tory Feed */
#toryFeed{display:flex; flex-direction:column; gap:15px; max-height:70vh; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#1877F2 rgba(255,255,255,0.1);}
#toryFeed::-webkit-scrollbar{width:8px;}
#toryFeed::-webkit-scrollbar-thumb{background:#1877F2; border-radius:4px;}
.toryCard{background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius:15px; padding:15px; color:#000; position:relative; transition:0.2s;}
.toryCard:hover{transform:translateY(-3px); box-shadow:0 0 15px #1877F2;}

/* Home Bar Liquid Glass */
#homeBar{position:fixed; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:15px; padding:10px 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(15px); border-radius:50px; box-shadow:0 0 15px rgba(24,119,242,0.5); z-index:10;}
#homeBar button{padding:10px 15px; border:none; border-radius:50%; background: rgba(255,255,255,0.2); color:#1877F2; font-weight:bold; cursor:pointer; transition:0.2s;}
#homeBar button:hover{background: rgba(255,255,255,0.3); box-shadow:0 0 15px #42A5F5;}

/* Scroll Top */
#scrollTopBtn{position:fixed; bottom:100px; right:20px; padding:10px; border:none; border-radius:50%; background: linear-gradient(90deg,#1877F2,#42A5F5); color:white; cursor:pointer; box-shadow:0 0 15px #42A5F5; z-index:10;}
#scrollTopBtn:hover{box-shadow:0 0 25px #42A5F5;}
