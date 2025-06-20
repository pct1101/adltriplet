<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuiEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $hoten = "";
    public $email = "";
    public $noidung = "";
    public $sodienthoai = "";

    public function __construct($ht, $em, $nd, $sdt)
    {
        $this->hoten = $ht;
        $this->email = $em;
        $this->noidung = $nd;
        $this->sodienthoai = $sdt;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mail liên hệ từ khách hàng',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return new Content(view: 'viewMailLienHe', );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
