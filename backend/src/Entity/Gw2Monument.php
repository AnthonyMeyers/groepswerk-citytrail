<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gw2Monument
 *
 * @ORM\Table(name="gw2_monument", uniqueConstraints={@ORM\UniqueConstraint(name="monument_mnm_id_uindex", columns={"mnm_id"})}, indexes={@ORM\Index(name="monument_stad_std_id_fk", columns={"mnm_std_id"})})
 * @ORM\Entity
 * @ApiResource()
 */
class Gw2Monument
{
    /**
     * @var int
     *
     * @ORM\Column(name="mnm_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mnmId;

    /**
     * @var string
     *
     * @ORM\Column(name="mnm_naam", type="string", length=100, nullable=false)
     */
    private $mnmNaam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="mnm_beschrijving", type="string", length=255, nullable=true)
     */
    private $mnmBeschrijving;

    /**
     * @var string|null
     *
     * @ORM\Column(name="mnm_afbeelding", type="string", length=200, nullable=true)
     */
    private $mnmAfbeelding;

    /**
     * @var \Gw2Stad
     *
     * @ORM\ManyToOne(targetEntity="Gw2Stad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="mnm_std_id", referencedColumnName="std_id")
     * })
     */
    private $mnmStd;

    public function getMnmId(): ?int
    {
        return $this->mnmId;
    }

    public function getMnmNaam(): ?string
    {
        return $this->mnmNaam;
    }

    public function setMnmNaam(string $mnmNaam): self
    {
        $this->mnmNaam = $mnmNaam;

        return $this;
    }

    public function getMnmBeschrijving(): ?string
    {
        return $this->mnmBeschrijving;
    }

    public function setMnmBeschrijving(?string $mnmBeschrijving): self
    {
        $this->mnmBeschrijving = $mnmBeschrijving;

        return $this;
    }

    public function getMnmAfbeelding(): ?string
    {
        return $this->mnmAfbeelding;
    }

    public function setMnmAfbeelding(?string $mnmAfbeelding): self
    {
        $this->mnmAfbeelding = $mnmAfbeelding;

        return $this;
    }

    public function getMnmStd(): ?Gw2Stad
    {
        return $this->mnmStd;
    }

    public function setMnmStd(?Gw2Stad $mnmStd): self
    {
        $this->mnmStd = $mnmStd;

        return $this;
    }


}
