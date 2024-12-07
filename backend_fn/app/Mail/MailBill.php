<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailBill extends Mailable
{
    use Queueable, SerializesModels;

    public $payment_amount = "";
    public $payment_date = "";
    public $payment_method = "";
    public $payment_fullname = "";

    public function __construct($payment_amount, $payment_date, $payment_method, $payment_fullname)
    {
        $this->payment_amount = $payment_amount;
        $this->payment_date = $payment_date;
        $this->payment_method = $payment_method;
        $this->payment_fullname = $payment_fullname;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Đây là hóa đơn của bạn',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(view: 'billpayment', );
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
