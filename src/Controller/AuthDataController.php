<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class AuthDataController extends AbstractController
{
    #[Route('/auth', name: 'auth', methods: ['POST'])]
    public function index(): Response
    {
        $user = $this->getUser();

        $auth = [
            "email" => $user->getUserIdentifier(),
            "username" => $user->getUsername(),
            "roles" => $user->getRoles(),
        ];

        return $this->json($auth);
    }
}
