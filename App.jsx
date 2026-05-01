import React, { useState, useEffect } from 'react';
import { 
  Search, Home, Users, Store, Gamepad2, Grid, MessageCircle, Bell, 
  User, ChevronDown, ThumbsUp, MessageSquare, Share2, MoreHorizontal,
  Plus, Video, Image as ImageIcon, Smile, LayoutDashboard, History, Bookmark, Sparkles, X, Send
} from 'lucide-react';

const INITIAL_CONTACTS = [
  { id: 1, name: "Ridvan Memedi", online: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ridvan" },
  { id: 2, name: "Oso Elli", online: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oso" },
  { id: 3, name: "Arlind Dashi", online: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlind" },
  { id: 4, name: "Nehat Memedi", online: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nehat" },
  { id: 5, name: "Naser Avzi Zharku", online: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naser" },
];

const INITIAL_POSTS = [
  {
    id: 'ad-1',
    author: "Kleinanzeigen",
    isAd: true,
    time: "Gesponsert",
    content: "Kleinanzeigen PRO - Ihr Online-Auftritt ganz einfach mit der Kleinanzeigen PRO Unternehmensseite. Jetzt testen!",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000",
    likes: 198,
    comments: [],
    shares: 7,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=kleinanzeigen",
  },
  {
    id: 1,
    author: "Kjani Zharki",
    time: "vor 2 Stunden",
    location: "Hannover, Deutschland",
    content: "Schöne Grüße aus dem Maschpark! Die App-Entwicklung für Hannover läuft super. 🚀",
    likes: 42,
    comments: [
      { id: 101, user: "Oso Elli", text: "Sieht super aus, Kjani!" }
    ],
    shares: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kjani"
  }
];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [activeTab, setActiveTab] = useState('home');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: "Kjani Zharki",
      time: "Gerade eben",
      content: newPostText,
      likes: 0,
      comments: [],
      shares: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kjani"
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setIsPostModalOpen(false);
  };

  const addCommentToPost = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), user: "Kjani Zharki", text: commentText }]
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21] font-sans">
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white font-bold text-2xl">f</div>
          <div className="hidden md:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-64">
            <Search size={18} className="text-gray-500 mr-2" />
            <input type="text" placeholder="In Hannover suchen" className="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
        <nav className="flex items-center h-full flex-1 justify-center max-w-lg">
          {[{ id: 'home', icon: Home }, { id: 'friends', icon: Users }, { id: 'market', icon: Store }, { id: 'gaming', icon: Gamepad2 }].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 h-full flex items-center justify-center border-b-4 transition-colors ${activeTab === item.id ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}>
              <item.icon size={26} fill={activeTab === item.id ? "currentColor" : "none"} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"><MessageCircle size={20} /></div>
          <div className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 relative">
            <Bell size={20} /><span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1">3</span>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kjani" alt="" /></div>
        </div>
      </header>
      <main className="pt-14 flex">
        <section className="flex-1 max-w-[680px] mx-auto py-6 px-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
            <div className="flex gap-2 mb-3">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kjani" className="w-10 h-10 rounded-full" alt="" />
              <button onClick={() => setIsPostModalOpen(true)} className="bg-[#F0F2F5] hover:bg-gray-200 transition-colors flex-1 rounded-full px-4 text-left text-gray-500">Was machst du gerade, Kjani?</button>
            </div>
          </div>
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onComment={(text) => addCommentToPost(post.id, text)} />
            ))}
          </div>
        </section>
      </main>
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[500px] border overflow-hidden">
             <div className="flex items-center justify-between p-4 border-b">
               <h2 className="text-xl font-bold">Beitrag erstellen</h2>
               <button onClick={() => setIsPostModalOpen(false)}><X size={20} /></button>
             </div>
             <textarea className="w-full p-4 text-xl outline-none resize-none min-h-[150px]" placeholder="Was machst du gerade?" value={newPostText} onChange={(e) => setNewPostText(e.target.value)} />
             <button onClick={handleCreatePost} className="w-full bg-[#1877F2] text-white py-2 font-bold">Posten</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, onComment }) {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="p-4 flex items-center gap-2">
        <img src={post.avatar} className="w-10 h-10 rounded-full" alt="" />
        <div><div className="font-bold">{post.author}</div><div className="text-xs text-gray-500">{post.time}</div></div>
      </div>
      <div className="px-4 pb-3 text-sm">{post.content}</div>
      {post.image && <img src={post.image} className="w-full h-auto" alt="" />}
      <div className="p-2 border-t flex">
        <button onClick={() => setLiked(!liked)} className={`flex-1 py-2 ${liked ? 'text-blue-600' : 'text-gray-500'}`}>Gefällt mir</button>
        <button className="flex-1 py-2 text-gray-500">Kommentieren</button>
      </div>
    </div>
  );
}
