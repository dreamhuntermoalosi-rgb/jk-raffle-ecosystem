'use client';

import { useState } from 'react';
import {
  Check,
  ChevronRight,
  ShoppingCart,
  Plus,
  Minus,
  CreditCard,
  Building2,
  Zap,
  ArrowLeft,
  Ticket,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn, formatCurrency, formatDate, generateTicketReference, getCategoryIcon } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { getActiveCampaigns } from '@/mock-data';
import { toast } from 'sonner';
import type { Campaign } from '@/types';

const steps = [
  { id: 1, label: 'Select Campaign' },
  { id: 2, label: 'Choose Quantity' },
  { id: 3, label: 'Review Cart' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Confirmation' },
];

const paymentMethods = [
  { id: 'payfast', label: 'PayFast', description: 'Instant EFT via PayFast', icon: Zap },
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, Amex', icon: CreditCard },
  { id: 'eft', label: 'EFT / OZOW', description: 'Direct bank transfer or OZOW', icon: Building2 },
];

export function MemberPurchase() {
  const { setView } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [generatedRefs, setGeneratedRefs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const campaigns = getActiveCampaigns();

  const subtotal = selectedCampaign ? selectedCampaign.ticketPrice * quantity : 0;
  const serviceFee = Math.round(subtotal * 0.02);
  const total = subtotal + serviceFee;

  function handleSelectCampaign(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setQuantity(1);
    setCurrentStep(2);
  }

  function handleProceedToCart() {
    if (quantity < 1 || quantity > 10) return;
    setCurrentStep(3);
  }

  function handleProceedToPayment() {
    setCurrentStep(4);
  }

  function handlePayNow() {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const refs = Array.from({ length: quantity }, () => generateTicketReference());
      setGeneratedRefs(refs);
      setIsProcessing(false);
      setCurrentStep(5);
      toast.success('Payment successful! Your tickets have been generated.', {
        description: `${quantity} ticket${quantity > 1 ? 's' : ''} for "${selectedCampaign?.title}"`,
      });
    }, 2000);
  }

  function handleReset() {
    setCurrentStep(1);
    setSelectedCampaign(null);
    setQuantity(1);
    setPaymentMethod('card');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setGeneratedRefs([]);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Purchase Tickets</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Choose a campaign, select your tickets, and complete your purchase
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          return (
            <div key={step.id} className="flex items-center">
              {index > 0 && (
                <ChevronRight className={cn(
                  'h-4 w-4 mx-1 shrink-0',
                  isCompleted ? 'text-maroon-500' : 'text-muted-foreground/30'
                )} />
              )}
              <button
                onClick={() => {
                  if (isCompleted) setCurrentStep(step.id);
                }}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
                  isCompleted && 'bg-maroon-500 text-white',
                  isCurrent && 'bg-gold-400 text-maroon-900',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                    isCurrent ? 'bg-maroon-900/20 text-maroon-900' : 'bg-muted-foreground/20'
                  )}>
                    {step.id}
                  </span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <StepSelectCampaign campaigns={campaigns} onSelect={handleSelectCampaign} />
      )}

      {currentStep === 2 && selectedCampaign && (
        <StepChooseQuantity
          campaign={selectedCampaign}
          quantity={quantity}
          setQuantity={setQuantity}
          onBack={() => setCurrentStep(1)}
          onNext={handleProceedToCart}
        />
      )}

      {currentStep === 3 && selectedCampaign && (
        <StepCartReview
          campaign={selectedCampaign}
          quantity={quantity}
          subtotal={subtotal}
          serviceFee={serviceFee}
          total={total}
          onBack={() => setCurrentStep(2)}
          onNext={handleProceedToPayment}
        />
      )}

      {currentStep === 4 && selectedCampaign && (
        <StepPayment
          total={total}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCvv={cardCvv}
          setCardCvv={setCardCvv}
          isProcessing={isProcessing}
          onBack={() => setCurrentStep(3)}
          onPay={handlePayNow}
        />
      )}

      {currentStep === 5 && selectedCampaign && (
        <StepConfirmation
          campaign={selectedCampaign}
          quantity={quantity}
          total={total}
          ticketRefs={generatedRefs}
          onViewTickets={() => setView('tickets')}
          onBuyMore={handleReset}
        />
      )}
    </div>
  );
}

/* ==============================
   STEP 1: Select Campaign
   ============================== */
function StepSelectCampaign({ campaigns, onSelect }: {
  campaigns: Campaign[];
  onSelect: (c: Campaign) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Select a Campaign</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="group cursor-pointer hover:shadow-royal-md transition-all duration-200 hover:-translate-y-0.5 border-0 shadow-royal-sm rounded-xl bg-white"
            onClick={() => onSelect(campaign)}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-maroon-50 flex items-center justify-center text-lg shrink-0">
                  {getCategoryIcon(campaign.product.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{campaign.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {campaign.branch.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-gold-50 text-gold-700 text-xs rounded-md border-0">
                  {formatCurrency(campaign.product.value)} prize
                </Badge>
                <span className="text-sm font-bold text-maroon-500">
                  {formatCurrency(campaign.ticketPrice)}
                  <span className="text-xs font-normal text-muted-foreground">/ticket</span>
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{campaign.soldTickets} sold</span>
                  <span>{campaign.maxTickets} total</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-gold-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(campaign.drawDate, 'long').split(',')[0]}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ==============================
   STEP 2: Choose Quantity
   ============================== */
function StepChooseQuantity({ campaign, quantity, setQuantity, onBack, onNext }: {
  campaign: Campaign;
  quantity: number;
  setQuantity: (q: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const maxPurchase = Math.min(10, campaign.maxTickets - campaign.soldTickets);
  const total = campaign.ticketPrice * quantity;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-lg hover:bg-maroon-50">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold tracking-tight">Choose Quantity</h2>
      </div>

      {/* Selected campaign details */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-maroon-50 flex items-center justify-center text-2xl shrink-0">
              {getCategoryIcon(campaign.product.category)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold tracking-tight">{campaign.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {formatCurrency(campaign.product.value)} prize &middot; {campaign.branch.name}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(campaign.drawDate)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Draw at {campaign.drawLocation?.split(',')[0]}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantity selector */}
      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-tight">Number of Tickets</CardTitle>
          <CardDescription className="text-xs">
            Maximum {maxPurchase} tickets available for this campaign (limit 10 per purchase)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 mb-6">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-border hover:bg-maroon-50 hover:border-maroon-200"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <span className="text-4xl font-bold tabular-nums tracking-tight">{quantity}</span>
              <p className="text-xs text-muted-foreground mt-1">tickets</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-border hover:bg-maroon-50 hover:border-maroon-200"
              onClick={() => setQuantity(Math.min(maxPurchase, quantity + 1))}
              disabled={quantity >= maxPurchase}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Price breakdown */}
          <div className="bg-maroon-50/50 rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ticket price</span>
              <span>{formatCurrency(campaign.ticketPrice)} each</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span>× {quantity}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-maroon-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="bg-maroon-500 hover:bg-maroon-600 rounded-[10px]"
          disabled={quantity < 1}
        >
          Continue to Review
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* ==============================
   STEP 3: Cart Review
   ============================== */
function StepCartReview({ campaign, quantity, subtotal, serviceFee, total, onBack, onNext }: {
  campaign: Campaign;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-lg hover:bg-maroon-50">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold tracking-tight">Review Your Order</h2>
      </div>

      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-maroon-500" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Item */}
          <div className="flex items-center gap-4 p-4 bg-maroon-50/50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shrink-0 shadow-royal-sm">
              {getCategoryIcon(campaign.product.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{campaign.title}</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(campaign.ticketPrice)} × {quantity} ticket{quantity > 1 ? 's' : ''}</p>
            </div>
            <p className="font-semibold text-sm">{formatCurrency(subtotal)}</p>
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service fee (2%)</span>
              <span>{formatCurrency(serviceFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-maroon-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By proceeding, you agree to the JK Raffle{' '}
            <span className="text-maroon-500 underline cursor-pointer">Terms &amp; Conditions</span>.
            All ticket sales are final. Draw results are independently verified.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="rounded-[10px] border-border hover:bg-maroon-50">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-maroon-500 hover:bg-maroon-600 rounded-[10px]"
        >
          Proceed to Checkout
          <CreditCard className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

/* ==============================
   STEP 4: Payment
   ============================== */
function StepPayment({ total, paymentMethod, setPaymentMethod, cardNumber, setCardNumber, cardExpiry, setCardExpiry, cardCvv, setCardCvv, isProcessing, onBack, onPay }: {
  total: number;
  paymentMethod: string;
  setPaymentMethod: (m: string) => void;
  cardNumber: string;
  setCardNumber: (v: string) => void;
  cardExpiry: string;
  setCardExpiry: (v: string) => void;
  cardCvv: string;
  setCardCvv: (v: string) => void;
  isProcessing: boolean;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-lg hover:bg-maroon-50">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold tracking-tight">Payment</h2>
        <Badge className="bg-gold-50 text-gold-700 ml-2 rounded-md border-0">
          {formatCurrency(total)}
        </Badge>
      </div>

      {/* Payment method selector */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Payment Method</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all cursor-pointer',
                  isSelected
                    ? 'border-maroon-500 bg-maroon-50/50 shadow-royal-sm'
                    : 'border-border bg-white hover:border-maroon-200'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isSelected ? 'bg-maroon-500 text-white' : 'bg-muted text-muted-foreground'
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={cn('text-sm font-medium', isSelected && 'text-maroon-700')}>
                    {method.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card form (shown for card method) */}
      {paymentMethod === 'card' && (
        <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">Card Details</CardTitle>
            <CardDescription className="text-xs">
              Enter your card information below (demo — no real payment)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Card Number</Label>
              <Input
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))}
                className="mt-1.5 font-mono rounded-lg"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Expiry Date</Label>
                <Input
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, '');
                    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                    setCardExpiry(v.slice(0, 5));
                  }}
                  className="mt-1.5 font-mono rounded-lg"
                  maxLength={5}
                />
              </div>
              <div>
                <Label className="text-xs">CVV</Label>
                <Input
                  placeholder="123"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="mt-1.5 font-mono rounded-lg"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === 'payfast' && (
        <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-maroon-50 flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-maroon-500" />
            </div>
            <p className="font-medium text-sm">PayFast Checkout</p>
            <p className="text-xs text-muted-foreground mt-1">
              You will be redirected to PayFast to complete your payment via instant EFT.
            </p>
          </CardContent>
        </Card>
      )}

      {paymentMethod === 'eft' && (
        <Card className="border-0 shadow-royal-sm rounded-xl bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-maroon-50 flex items-center justify-center mx-auto mb-3">
              <Building2 className="h-6 w-6 text-maroon-500" />
            </div>
            <p className="font-medium text-sm">EFT / OZOW Payment</p>
            <p className="text-xs text-muted-foreground mt-1">
              You will be redirected to complete your bank transfer or OZOW payment.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isProcessing} className="rounded-[10px] border-border hover:bg-maroon-50">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button
          onClick={onPay}
          className="bg-maroon-500 hover:bg-maroon-600 min-w-[160px] rounded-[10px]"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              Pay {formatCurrency(total)}
              <CreditCard className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* ==============================
   STEP 5: Confirmation
   ============================== */
function StepConfirmation({ campaign, quantity, total, ticketRefs, onViewTickets, onBuyMore }: {
  campaign: Campaign;
  quantity: number;
  total: number;
  ticketRefs: string[];
  onViewTickets: () => void;
  onBuyMore: () => void;
}) {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-royal-lg rounded-xl bg-white overflow-hidden">
        <CardContent className="p-8 text-center">
          {/* Success checkmark */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-maroon-50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-500">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-maroon-500 tracking-tight">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Your purchase has been confirmed. Good luck!
          </p>

          {/* Summary */}
          <div className="mt-6 bg-maroon-50/50 rounded-xl p-5 max-w-md mx-auto text-left">
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign</span>
                <span className="font-medium text-right max-w-[200px] truncate">{campaign.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tickets</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-maroon-500">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Generated ticket references */}
          {ticketRefs.length > 0 && (
            <div className="mt-6">
              <p className="text-xs text-muted-foreground mb-3">Your ticket reference(s):</p>
              <div className="flex flex-wrap justify-center gap-2">
                {ticketRefs.map((ref) => (
                  <div
                    key={ref}
                    className="bg-maroon-50 border border-maroon-100 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-maroon-500" />
                      <span className="font-mono text-sm font-bold text-maroon-600">
                        {ref}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button onClick={onViewTickets} className="bg-maroon-500 hover:bg-maroon-600 rounded-[10px]">
              View My Tickets
            </Button>
            <Button variant="outline" onClick={onBuyMore} className="rounded-[10px] border-border hover:bg-maroon-50">
              Buy More Tickets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}