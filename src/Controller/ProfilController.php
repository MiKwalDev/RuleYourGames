<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ProfilController extends AbstractController
{
    #[Route('/profil', name: 'profil', methods: ['POST'])]
    public function index(): Response
    {
        $user = $this->getUser();
        
        return !$user ? $this->json("Aucun utilisateur") : $this->json($user);
    }
}
