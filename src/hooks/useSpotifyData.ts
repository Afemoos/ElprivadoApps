import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, APP_ID } from '../config/firebase';
import { Member, PaymentData } from '../types';

export function useSpotifyData() {
    const [user, setUser] = useState<User | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [payments, setPayments] = useState<Record<string, PaymentData>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Error de autenticación:", error);
            }
        };
        initAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const membersRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_members');
        const paymentsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_payments');

        const unsubscribeMembers = onSnapshot(membersRef, (snapshot) => {
            const loadedMembers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Member[];
            setMembers(loadedMembers.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)));
            setIsLoading(false);
        }, (error) => console.error("Error cargando miembros:", error));

        const unsubscribePayments = onSnapshot(paymentsRef, (snapshot) => {
            const loadedPayments: Record<string, PaymentData> = {};
            snapshot.docs.forEach(doc => {
                loadedPayments[doc.id] = doc.data() as PaymentData;
            });
            setPayments(loadedPayments);
        }, (error) => console.error("Error cargando pagos:", error));

        return () => {
            unsubscribeMembers();
            unsubscribePayments();
        };
    }, [user]);

    const addMember = async (name: string) => {
        if (!name.trim() || !user) return;
        const newId = Date.now().toString();
        const newMember = { name: name.trim(), createdAt: Date.now() };
        try {
            const docRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_members', newId);
            await setDoc(docRef, newMember);
        } catch (e) { console.error(e); throw e; }
    };

    const removeMember = async (id: string) => {
        try {
            const docRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_members', id);
            await deleteDoc(docRef);
        } catch (e) { console.error(e); throw e; }
    };

    const markAsPaid = async (member: Member, key: string) => {
        if (!user) return;
        try {
            const docRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_payments', key);
            await setDoc(docRef, { date: new Date().toISOString(), name: member.name });
        } catch (e) { console.error(e); throw e; }
    };

    const undoPayment = async (key: string) => {
        try {
            const docRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_payments', key);
            await deleteDoc(docRef);
        } catch (e) { console.error(e); throw e; }
    };

    const deleteHistorical = async (key: string) => {
        try {
            const docRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'spotify_payments', key);
            await deleteDoc(docRef);
        } catch (e) { console.error(e); throw e; }
    };

    return {
        user,
        members,
        payments,
        isLoading,
        addMember,
        removeMember,
        markAsPaid,
        undoPayment,
        deleteHistorical
    };
}
