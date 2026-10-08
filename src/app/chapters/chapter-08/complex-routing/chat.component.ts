import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-chat',
  template: `
    <div class="chat">
      <strong>Chat</strong>
      <p>Rendered in the named <code>sidebar</code> outlet, alongside the primary outlet.</p>
    </div>
  `,
  styles: `
    .chat {
      border: 1px dashed #7a7fa8;
      border-radius: 8px;
      padding: 10px 14px;
      background: #f4f5fb;
    }
  `,
})
export class ChatComponent {}
