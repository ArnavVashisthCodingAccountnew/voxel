const row = document.getElementById("row");
const menu = document.getElementById("contextMenu");
let activeCard = null;
var count = 3
// Use event delegation for rightclick menu
row.addEventListener("contextmenu", (e) => {
  const btn = e.target.closest(".three_dots");
  if (!btn) return; 

  e.preventDefault();
  e.stopPropagation();

  const card = btn.closest(".card");
  if (activeCard){ activeCard.style.borderColor = "#82EC9D";} // reset old one
  card.style.borderColor = "#FFFFFF";
  activeCard = card;

  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.display = "flex";
});

// Hide menu on click outside
document.addEventListener("click", () => {
  menu.style.display = "none";
  if (activeCard) {
    activeCard.style.borderColor = "#82EC9D";
    activeCard = null;
  }
});


// Remove and Edit Functions
function edit(){
    if(!activeCard) return;
      const nameLabel = activeCard.querySelector(".name-label");
     const newName = prompt("Enter new name:", nameLabel.textContent);
    nameLabel.textContent = newName;
}
function remove() {
  if (!activeCard) return;
  activeCard.remove();
  activeCard = null; 
  count -= 1;
}


// Add a card
function addcard(){
 if(count<4){
  count += 1;
  const btncardi = document.getElementById("godi");
  let html = '<div id="four" class="card"><img class="profile_pic" src="profile_pic.png"/><h4 class="name-label">Arnav Vashisth</h4><button class="three_dots"><img src="three_dots.png" alt="menu"></button></div>';
  btncardi.insertAdjacentHTML("beforebegin",html);
 }
 else{
    alert("Sorry, only 4 profiles are supported with your current plan.")
 }
}

class DiscordInterface {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateElements();
    }

    setupEventListeners() {
        // Back button functionality
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            this.showNotification('Going back...', 'info');
        });

        // Voice card interactions
        const voiceCards = document.querySelectorAll('.voice-card');
        voiceCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('.voice-name').textContent;
                this.joinVoiceChannel(name);
            });

            card.addEventListener('mouseenter', () => {
                this.handleCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.handleCardHover(card, false);
            });
        });

        // Voice control buttons
        const voiceButtons = document.querySelectorAll('.voice-btn');
        voiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleVoiceControl(button);
            });
        });

        // Member interactions
        const memberItems = document.querySelectorAll('.member-item');
        memberItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.querySelector('.member-name').textContent;
                this.showUserProfile(name);
            });
        });

        // User list interactions
        const userItems = document.querySelectorAll('.user-item');
        userItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.textContent.trim();
                this.openChat(name);
            });
        });

        // Server icon interactions
        const serverIcons = document.querySelectorAll('.server-icon');
        serverIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                this.switchServer(index);
            });
        });

        // Search functionality
        const searchBar = document.querySelector('.search-bar');
        searchBar.addEventListener('click', () => {
            this.focusSearch();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    joinVoiceChannel(channelName) {
        this.showNotification(`Joining ${channelName}'s voice channel...`, 'success');
        
        // Simulate connection animation
        const voiceCard = Array.from(document.querySelectorAll('.voice-card'))
            .find(card => card.querySelector('.voice-name').textContent === channelName);
        
        if (voiceCard) {
            voiceCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                voiceCard.style.transform = '';
            }, 300);
        }

        // Update voice controls to show active state
        const callButton = document.querySelector('.voice-btn.call');
        callButton.classList.add('active');
    }

    handleVoiceControl(button) {
        if (button.classList.contains('mute')) {
            button.classList.toggle('active');
            const isMuted = button.classList.contains('active');
            this.showNotification(isMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
        } else if (button.classList.contains('deafen')) {
            button.classList.toggle('active');
            const isDeafened = button.classList.contains('active');
            this.showNotification(isDeafened ? 'Audio deafened' : 'Audio undeafened', 'info');
        } else if (button.classList.contains('call')) {
            button.classList.toggle('active');
            const isConnected = button.classList.contains('active');
            this.showNotification(isConnected ? 'Connected to voice' : 'Disconnected from voice', 
                isConnected ? 'success' : 'warning');
        }
    }

    handleCardHover(card, isHovering) {
        const avatar = card.querySelector('.voice-avatar');
        
        if (isHovering) {
            avatar.style.transform = 'scale(1.1)';
        } else {
            avatar.style.transform = '';
        }
    }

    showUserProfile(username) {
        this.showNotification(`Opening ${username}'s profile...`, 'info');
    }

    openChat(chatName) {
        this.showNotification(`Opening chat with ${chatName}...`, 'info');
    }

    switchServer(serverIndex) {
        // Remove active class from all server icons
        document.querySelectorAll('.server-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        
        // Add active class to clicked server
        document.querySelectorAll('.server-icon')[serverIndex].classList.add('active');
        
        this.showNotification(`Switched to server ${serverIndex + 1}`, 'info');
    }

    focusSearch() {
        this.showNotification('Search activated', 'info');
        // In a real implementation, this would focus the search input
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.focusSearch();
        }
        
        // Ctrl/Cmd + Shift + M for mute
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            const muteButton = document.querySelector('.voice-btn.mute');
            this.handleVoiceControl(muteButton);
        }
        
        // Ctrl/Cmd + Shift + D for deafen
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            const deafenButton = document.querySelector('.voice-btn.deafen');
            this.handleVoiceControl(deafenButton);
        }
    }

    animateElements() {
        // Animate voice cards on load
        const voiceCards = document.querySelectorAll('.voice-card');
        voiceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });

        // Animate member list
        const memberItems = document.querySelectorAll('.member-item');
        memberItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 400 + (index * 100));
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '1001',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            color: 'white',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            success: '#43b581',
            warning: '#faa61a',
            error: '#ed4245',
            info: '#5865f2'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Simulate online status updates
    updateOnlineStatus() {
        const statusElements = document.querySelectorAll('.member-status');
        const statuses = ['Online', 'Away', 'Do Not Disturb', 'Invisible'];
        
        statusElements.forEach(element => {
            if (Math.random() > 0.9) { // 10% chance to change status
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                element.textContent = newStatus;
                
                // Update color based on status
                element.style.color = {
                    'Online': '#43b581',
                    'Away': '#faa61a',
                    'Do Not Disturb': '#ed4245',
                    'Invisible': '#747f8d'
                }[newStatus] || '#43b581';
            }
        });
    }
}

// Initialize the Discord interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const discordApp = new DiscordInterface();
    
    // Update online status every 30 seconds
    setInterval(() => {
        discordApp.updateOnlineStatus();
    }, 30000);
});

// Add some dynamic behavior for voice cards
document.addEventListener('DOMContentLoaded', () => {
    const voiceCards = document.querySelectorAll('.voice-card');
    
    // Add breathing animation to voice avatars
    voiceCards.forEach(card => {
        const avatar = card.querySelector('.voice-avatar');
        
        setInterval(() => {
            avatar.style.transform = 'scale(1.05)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 1000);
        }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    });
});

// Add realistic typing indicators
function addTypingIndicator() {
    const chatAreas = document.querySelectorAll('.user-item');
    
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance
            const randomUser = chatAreas[Math.floor(Math.random() * chatAreas.length)];
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.innerHTML = '...';
            indicator.style.cssText = `
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                color: #43b581;
                font-size: 12px;
                animation: pulse 1s infinite;
            `;
            
            randomUser.style.position = 'relative';
            randomUser.appendChild(indicator);
            
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 3000);
        }
    }, 5000);
}